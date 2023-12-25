import styled from '@emotion/styled';
import {
  Box,
  Button,
  Card,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import toast from 'react-hot-toast';
import NumberInputBasic from '../../components/NumberInput';
import { useApi } from '../../hooks/useApi';

const AwardEditor = ({ data, closeModal }) => {
  const [award, setAward] = useState(data);
  const [loading, api] = useApi();
  const { _id, name, description, collection, cost, variants } = award;

  const isEdit = !!_id;

  const onChangeHandler = (e) => {
    let value = e.target.value;

    if (value === 'none' && e.target.name === 'collection') value = null;

    setAward({ ...award, [e.target.name]: e.target.value });
  };

  // ==========================
  const onSaveSubmit = () => {
    if (!name || !variants?.length || !cost)
      return toast.error('Заполните обязательные поля');

    api('awards', {
      method: 'PUT',
      body: award,
      success: () => {
        toast.success('Награда обновлена');
        closeModal();
      },
      error: (err) => {
        console.warn(err);
        toast.error('Ошибка');
      },
    });
  };

  const onAddSubmit = () => {
    if (!name || !variants?.length || !cost)
      return toast.error('Заполните обязательные поля');

    api('awards', {
      body: award,
      success: () => {
        toast.success('Награда создана');
        closeModal();
      },
      error: (err) => {
        console.warn(err);
        toast.error('Ошибка');
      },
    });
  };

  return (
    <Box sx={{ width: 600 }} padding={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">{isEdit ? name : 'New Award'}</Typography>
        {isEdit && (
          <Button disabled={loading} onClick={onSaveSubmit}>
            Save
          </Button>
        )}
        {!isEdit && (
          <Button disabled={loading} onClick={onAddSubmit} variant="contained">
            Add
          </Button>
        )}
      </Stack>
      <Stack spacing={2} marginTop={3}>
        <TextField
          required
          label="Название"
          name="name"
          value={name || ''}
          onChange={onChangeHandler}
        />
        <TextField
          label="Описание"
          name="description"
          value={description || ''}
          onChange={onChangeHandler}
        />

        <Box>
          <Typography>Коллекция</Typography>
          <Select
            fullWidth
            value={collection || 'none'}
            name="collection"
            onChange={onChangeHandler}>
            <MenuItem value={'none'}>Нету</MenuItem>
            <MenuItem value={'almau'}>AlmaU</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography>Цена *</Typography>

          <NumberInputBasic value={cost || 0} name="cost" onChange={onChangeHandler} />
        </Box>

        <VariantsEditor variants={variants || []} name="variants" onChange={onChangeHandler} />
      </Stack>
    </Box>
  );
};

const VariantsEditor = ({ variants, name, onChange }) => {
  const setVariants = (value) =>
    onChange({
      target: {
        name,
        value,
      },
    });

  const onAddTab = () => {
    const len = variants.length;
    setVariants([
      ...variants,
      { type: `tab${len}`, label: `Вариант ${len}`, background: '#000', quantity: 0, imgs: [] },
    ]);
  };

  const onRemoveTab = (index) => {
    setVariants(variants.filter((x, i) => i !== index));
  };

  const onChangeVariant = (index, name, value) => {
    setVariants(variants.map((x, i) => (i === index ? { ...x, [name]: value } : x)));
  };

  const [openColor, setOpenColor] = useState(false);

  const onChangeImg = (index, imgIndex, value) => {
    onChangeVariant(
      index,
      'imgs',
      variants[index].imgs.map((x, i) => (i === imgIndex ? value : x))
    );
  };
  const onAddImg = (index) => {
    onChangeVariant(index, 'imgs', [...variants[index].imgs, '']);
  };
  const onRemoveImg = (index, imgIndex) => {
    onChangeVariant(
      index,
      'imgs',
      variants[index].imgs.filter((x, i) => i !== imgIndex)
    );
  };

  return (
    <Stack spacing={1}>
      <Typography variant="p">
        Варианты
        <IconButton onClick={onAddTab} sx={{ width: 32, height: 32 }}>
          +
        </IconButton>
      </Typography>
      <VariantWrap>
        <Stack direction="row" spacing={1}>
          {variants.map((x, i) => {
            const { label, type, quantity, background, imgs } = x;
            return (
              <VariantItem key={i}>
                <Stack spacing={2}>
                  <TextField
                    value={type}
                    label="Идентификатор"
                    onChange={(e) => onChangeVariant(i, 'type', e.target.value)}
                  />
                  <TextField
                    value={label}
                    label="Название"
                    onChange={(e) => onChangeVariant(i, 'label', e.target.value)}
                  />
                  <Box>
                    <Typography>Количество *</Typography>
                    <NumberInputBasic
                      value={quantity || 0}
                      name="quantity"
                      onChange={(e) => onChangeVariant(i, 'quantity', e.target.value)}
                    />
                  </Box>
                  <Typography variant="caption">Цвет</Typography>
                  <Stack direction="row" spacing={2} sx={{ position: 'relative' }}>
                    <Color style={{ background }} />
                    <TextField
                      value={background}
                      onChange={(e) => onChangeVariant(i, 'background', e.target.value)}
                    />
                    <Button onClick={() => setOpenColor(!openColor)}>Палитра</Button>
                    {openColor && (
                      <HexColorPicker
                        style={{ position: 'absolute', left: 0, top: '-100%', zIndex: 999 }}
                        color={background}
                        onChange={(v) => onChangeVariant(i, 'background', v)}
                      />
                    )}
                  </Stack>

                  <Stack>
                    <Typography variant="caption">
                      Картинки
                      <IconButton onClick={() => onAddImg(i)} sx={{ width: 32, height: 32 }}>
                        +
                      </IconButton>
                    </Typography>

                    {imgs.map((img, imgIndex) => (
                      <Stack key={imgIndex} direction="row" alignItems="center">
                        <img style={{ width: 40, height: 60, objectFit: 'contain' }} src={img} />
                        <TextField
                          fullWidth
                          value={img}
                          onChange={(e) => onChangeImg(i, imgIndex, e.target.value)}
                        />
                        <IconButton
                          onClick={() => onRemoveImg(i, imgIndex)}
                          sx={{ width: 40, height: 40 }}>
                          -
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>

                  <Button color="error" onClick={() => onRemoveTab(i)}>
                    Удалить
                  </Button>
                </Stack>
              </VariantItem>
            );
          })}
        </Stack>
      </VariantWrap>
    </Stack>
  );
};

const VariantItem = styled(Card)`
  flex-shrink: 0;
  width: 400px;
  height: 600px;
  padding: 15px;
`;

const VariantWrap = styled(Box)`
  overflow-x: auto;
  padding: 5px;
`;

const Color = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: black;
`;

export default AwardEditor;
