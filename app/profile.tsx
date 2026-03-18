import SkillsList from "@/components/SkillsList";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";


export default function Profile() {
    const { name, role } = useLocalSearchParams<{ name: string, role: string }>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <SkillsList name={name} role={role} query={searchQuery} onSearch={setSearchQuery} />
  );
}