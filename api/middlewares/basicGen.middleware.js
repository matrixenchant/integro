import Queue from 'bull';
import OpenAI from 'openai';
import { io } from '../../sockets';
import { formatPromptSystem } from '../client/prompt/prompt.service';

import * as dotenv from 'dotenv';
dotenv.config()

const openai = new OpenAI();

const jobs = {};

export const genMid = async (req, res, next) => {
  const queue = new Queue('generationQueque');

  queue.process(async (job, done) => {
    // Prompt Data
    const id = job.id;
    const { clientId, blockId, input, output, logic } = job.data;

    const system = formatPromptSystem(logic, input, output);

    console.log(system);

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: system }],
      model: 'gpt-3.5-turbo',
      stream: true,
    });

    jobs[id].data.result = '';

    for await (const chunk of completion.toReadableStream()) {
      const chunkText = new TextDecoder('utf-8').decode(chunk);
      const chunkObject = JSON.parse(chunkText);

      jobs[id].data.result += chunkObject.choices[0]?.delta?.content || '';

      // console.log(`Proccesing[${id}]... `);
      io.emit(`basicGen-${id}`, {
        content: chunkObject.choices[0]?.delta?.content || '',
        done: false,
      });
    }

    io.emit(`basicGen-${id}`, { content: '', done: true });
    done();
  });

  queue.on('active', function (job, jobPromise) {
    jobs[job.id] = job;
    jobs[job.id].data.status = 'processing';
    console.log(`Job ${job.id} started`);
  });

  queue.on('waiting', function (jobId) {
    console.log(`Job ${jobId} waiting`);
  });

  queue.on('completed', function (job, result) {
    console.log(`Job ${job.id} completed`, result);
    jobs[job.id].data.status = 'completed';
  });

  queue.on('failed', function (job, err) {
    console.log(`Job ${job.id} got error`, err);
    jobs[job.id].data.status = 'failed';
    jobs[job.id].data.error = err;
  });

  queue.on('error', function (error) {
    console.log(`Queque got error`, error);
  });

  req.queue = queue;
  req.jobs = jobs;
  next();
};
