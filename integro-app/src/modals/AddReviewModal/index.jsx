import React, { useEffect, useRef } from 'react';
import { Button } from '../../components/ui';
import { useApi } from '../../hooks/useApi';
import './index.scss';
import toast from 'react-hot-toast';

const AddReviewModal = ({ data, closeModal, open }) => {
  const { project, $addReview } = data;
  const [loading, api] = useApi();
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.value = '';
  }, [open]);

  const onAddHandler = () => {
    api(`projects/${project._id}/reviews`, {
      body: {
        text: textRef.current.value,
      },
      success: (newReview) => {
        $addReview(newReview);
        toast.success('Ваше мнение добавлено');
        closeModal();
      }
    });
  };

  return (
    <div className="add-review-modal">
      <h2>Добавление комментария</h2>
      <div className="add-review-modal-text">
        <textarea ref={textRef} rows="5"></textarea>
      </div>
      <Button loading={loading} label="Добавить" fullWidth onClick={onAddHandler} />
    </div>
  );
};

export default AddReviewModal;
