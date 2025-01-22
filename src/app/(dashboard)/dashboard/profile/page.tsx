"use client";

import ProfileForm from "@/components/Form/ProfileForm";
import { useData } from "@/context/DataContext";
import { ReconditionHouse } from "@/model/type";

const ProfilePage = () => {
  const { data, loading } = useData();
  return <ProfileForm data={data as ReconditionHouse} loading={loading} />;
};

export default ProfilePage;
