import React, {useState} from 'react';
import { uploadPhoto } from "utils/firebase/storage";
import {Button, Upload, message} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import useQueryParam from "hooks/use-query-param";

const PhotoUpload = () => {
  const uid = useQueryParam("uid");
  const [photoURL, setPhotoURL] = useState("https://lh3.googleusercontent.com/a-/AOh14Gh_YAskwKvHLMuETVwTC6B4DAU9w9CQBVfBiX5t");
  const [loading, setLoading] = useState(false)

  const validateImage = (file) => {
    const validMimeType = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!validMimeType) {
      message.error('Please upload a .jpg or .png image only');
    }
    const validFileSize = file.size / 1024 / 1024 < 2;
    if (!validFileSize) {
      message.error('Please upload an image that smaller than 2MB');
    }
  }

  const handleChange = async (event) => {
    console.log({ event });
    // try {
    //   const url = await uploadPhoto(uid, file);
    //   console.log({ url });
    // } catch(error) {
    //   console.error(error);
    // }
  }

  const uploadButton = (
    <input
      type="file"
      name="photoURL"
      onChange={(event) => console.log(event)}
    />
  )
  return (
    <div>
        {/*{photoURL ? <img src={photoURL} alt="avatar" style={{ width: '50%'}} /> : uploadButton}*/}
        {uploadButton}
    </div>
  );
};

export default PhotoUpload;