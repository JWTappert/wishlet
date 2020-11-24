import React, {useState, useRef} from 'react';
import styled from "styled-components";
import {LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import useQueryParam from "hooks/use-query-param";

const PhotoUpload = ({url, setUrl}) => {
  const uid = useQueryParam("uid");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  const uploadInput = useRef(null);

  const validateImage = (file) => {
    const validMimeType = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!validMimeType) {
      setError('Please upload a .jpg or .png image only');
    }
    const validFileSize = file.size / 1024 / 1024 < 2;
    if (!validFileSize) {
      setError('Please upload an image that smaller than 2MB');
    }
  }

  const handleChange = async (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    if (!file) return;

    reader.onloadstart = () => {
      validateImage(file);
    };

    reader.onloadend = async () => {
      if (error) {
        console.log({error});
        reader.abort();
      }
      setUrl(reader.result);
      setLoading(true);
      try {
        // const url = await uploadPhoto(uid, file);
        setLoading(false);
      } catch(error) {
        console.error(error);
        setLoading(false);
      }
    };

    try {
      reader.readAsDataURL(file);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <Container>
        {<img src={url} alt="avatar" style={{ width: '50%'}} />}
        <UploadButton htmlFor="file-upload" onClick={() => {
          uploadInput.current.click();
          setError(null);
        }}>
          {loading ? <LoadingOutlined /> : <UploadOutlined />} Choose Photo
          <HiddenInput
            type="file"
            name="file-upload"
            ref={uploadInput}
            onChange={(event) => handleChange(event)}
          />
        </UploadButton>
      {error && <StyledError>{error}</StyledError>}
    </Container>
  );
};

const StyledError = styled.small`
  margin-top: 1.5em;
  color: tomato;
`;

const HiddenInput = styled.input`
  display: none; 
`;

const UploadButton = styled.label`
  margin-top: 1em;
  color: #fff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.85);
  background: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default PhotoUpload;