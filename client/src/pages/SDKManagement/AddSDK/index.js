import React, { useState } from "react";
import { Button } from 'antd';
import SDKModal from './SDKModal';
import { IconNew } from '../svgr';

const AddSDK = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleAddClick} type="primary" icon={<IconNew className="search-icon" />}>Create SDK</Button>
      {isModalOpen && (
        <SDKModal onConfirm={handleConfirm} onCancel={handleCancel}></SDKModal>
      )}
    </>
  );
};
export default AddSDK;

