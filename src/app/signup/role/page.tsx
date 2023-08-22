"use client";

import { useState } from "react";
import Button from "@/components/global/Button";
import { ArrowRightIcon, CheckIcon, ClientRoleIcon, CoachRoleIcon } from "@/components/global/Icons";
import { useRouter } from "next/navigation";
import { borderColor } from "@/utils/themeColors";
import { IRole } from "@/types/user";

export default function Signup() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const roles: IRole[] = [
    {
      title: "I'm a coach",
      icon: <CoachRoleIcon />,
      description: "I'm here to teach and earn income.",
      type: "Coach"
    },
    {
      title: "I'm a client",
      icon: <ClientRoleIcon />,
      description: "I'm looking for the best coach.",
      type: "Client"
    }
  ];

  const handleClickRole = (type: string) => {
    setSelectedRole(type);
  };

  return (
    <div className="signin-page flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <div className="px-5 text-center">
          <h1 className="text-6xl">L.</h1>
        </div>
      </div>
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-3/4">
          <h2 className="font-semibold text-3xl mb-10">What's your role?</h2>

          {roles.map((role: IRole, index: number) => (
            <div
              key={index}
              onClick={() => handleClickRole(role.type)}
              className={`
                ${selectedRole === role.type && 'border-blue-500'}
                cursor-pointer flex justify-between items-center w-[350px] border border-solid mt-3 p-4 rounded-lg
              `}
            >
              <div className="flex gap-[8px] items-center">
                {role.icon}
                <div>
                  {role.title}
                  <p className="text-[13px] text-neutral-600 font-light">
                    {role.description}
                  </p>
                </div>
              </div>
              <div 
                className={`
                  ${selectedRole === role.type ? 'border-blue-500 bg-blue-500' : borderColor}
                  ${borderColor} 
                  w-[18px] h-[18px] border border-solid rounded-full
                  overflow-hidden
                  flex items-center
                `}
              />
            </div>
          ))}
          <Button 
            variant="contained" 
            className="w-[350px] mt-3"
            endIcon={<ArrowRightIcon />}
            onClick={() => router.push(`/signup?roleType=${selectedRole}`)}
          >
            Continue
          </Button>

          <hr className="my-10 w-[70%]" />
          <p className="text-neutral-500">
            Already have an account?
            <span 
              onClick={() => router.push('/signin')}
              className="ml-1 text-darkTheme-950 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};