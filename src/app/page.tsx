import { UserProfile } from "@/components/userProfile";

export default function Home() {
  return (
    <div className="bg-white w-full h-screen flex flex-col justify-center items-center">
      <UserProfile />
    </div>
  );
}
