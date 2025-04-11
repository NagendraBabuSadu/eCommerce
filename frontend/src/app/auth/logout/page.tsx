"use client";

import React from "react";
import styles from "../signup/signup.module.css";
import Image from "next/image";


const LogoutForm: React.FC = () => {
  return (
    <div>
      <form action="" className={styles.signupform}>
        <div className={styles.signupCard}>
          <div className="flex min-h-screen w-full">
            <div className="w-2/5 bg-[#2874f0] text-white p-1 flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">Logout</h1>
              <p className="text-sm leading-relaxed">Comeback again!!!</p>
              <Image
                src="https://img.freepik.com/premium-vector/logout-icon_1134231-5042.jpg?semt=ais_hybrid&w=740"
                width={300}
                height={200}
                alt="Login illustration"
                className="mt-8 w-full"
              />
            </div>

            {/* Right Section */}
            <div className="w-3/5 bg-white p-10 flex flex-col justify-center">
              <p className="text text-blue-500 font-medium">
                Logged out Successfully.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogoutForm;
