import React, { useContext, useState, useEffect } from 'react';
import { Modal, Form, Input } from "antd";
import useQueryParam from "hooks/use-query-param";
import {ProfileContext} from "contexts/profile-context";
import PhotoUpload from "../photo-upload";

function ProfileEditModal({ showEdit, setEdit }) {
  const uid = useQueryParam("uid");
  const {
    state: { profile, loading },
    handleUpdateUserProfile,
  } = useContext(ProfileContext);
  const [photoURL, setPhotoURL] = useState('https://via.placeholder.com/350x150');
  const [fields, setFields] = useState(mapProfileToFields(profile));

  useEffect(() => {
    setFields(mapProfileToFields(profile))
    setPhotoURL(profile?.photoURL);
  }, [profile]);

  const onSubmit = () => {
    const updates = mapFieldsToProfile(fields);
    handleUpdateUserProfile(uid, updates);
    setEdit(!showEdit);
  }

  return (
    <Modal
      title="Edit Profile"
      visible={showEdit}
      onCancel={() => setEdit(!showEdit)}
      onOk={() => onSubmit()}
    >
      <EditProfileForm
        fields={fields}
        onChange={(newFields) => setFields(newFields)}
        loading={loading}
        photoUrl={photoURL}
        setPhotoUrl={setPhotoURL}
      />
    </Modal>
  );
}


export default ProfileEditModal;

const EditProfileForm = ({ onChange, fields, photoUrl, setPhotoUrl }) => {
  return (
    <div>
      <PhotoUpload url={photoUrl} setUrl={setPhotoUrl}  />
      <Form
        name="edit-profile"
        layout="vertical"
        fields={fields}
        onFieldsChange={(changedFields, allFields) => {
          onChange(allFields);
        }}
      >
        <Form.Item label="Email" name="email">
          <Input disabled/>
        </Form.Item>
        <Form.Item label="Display Name" name="displayName">
          <Input />
        </Form.Item>
        <Form.Item label="Website" name="website">
          <Input />
        </Form.Item>
        <Form.Item label="Facebook" name="facebook">
          <Input />
        </Form.Item>
        <Form.Item label="Instagram" name="instagram">
          <Input />
        </Form.Item>
        <Form.Item label="Twitter" name="twitter">
          <Input />
        </Form.Item>
        <Form.Item
          label="Youtube"
          name="youtube"
          placeholder="Youtube Channel"
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
};

const mapProfileToFields = (profile) => {
  return [
    {
      name: ['email'],
      value: profile?.email,
    },
    {
      name: ['displayName'],
      value: profile?.displayName,
    },
    {
      name: ['photoURL'],
      value: profile?.photoURL,
    },
    {
      name: ['website'],
      value: profile?.website,
    },
    {
      name: ['facebook'],
      value: profile?.facebook,
    },
    {
      name: ['instagram'],
      value: profile?.instagram,
    },
    {
      name: ['twitter'],
      value: profile?.twitter,
    },
    {
      name: ['youtube'],
      value: profile?.youtube,
    },
  ];
}

const mapFieldsToProfile = (fields, photoUrl) => {
  const updates = {};
  const nonEmpty = fields.filter(field => field.value);
  nonEmpty.forEach(field => {
    updates[field.name[0]] = field.value;
  });
  if (photoUrl) {
    updates['photoURL'] = photoUrl;
  }
  return updates;
}