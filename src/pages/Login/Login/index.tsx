import { Button, Form, Input } from "antd";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";
import {FiHelpCircle, FiLock} from 'react-icons/fi';

interface Props {}


const Login = (props: Props) => {
  const submitEl = useRef(null);
  const { onFinish, onFinishFailed } = useLogin("admin");

  const submitFrom = () => {
    let btn: HTMLElement = (submitEl.current as unknown) as HTMLElement;
    console.log();
    btn.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-3xl mb-5">VONE</h1>
        <h3 className="text-center tracking-wider text-base mb-5">
          interface d'administration
        </h3>
        <div className="bg-white shadow w-full rounded-md divide-y divide-gray-200">
          <div className="px-5 py-7">
            {/* FORMULAIRE */}
            <Form
              name="roleForm"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div className="relative mb-3">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrez une adresse mail !",
                    },
                    { type: "email", message: "l'adresse n'est pas valide !" },
                  ]}
                >
                  <Input className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </Form.Item>
              </div>

              <div className="relative mb-3">
                <Form.Item
                  label="Mot de passe"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrez un mot de passe !",
                    },
                    {
                      message: "Veuillez entrez plus de 5 caracteres !",
                      min: 5,
                    },
                  ]}
                >
                  <Input.Password className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </Form.Item>
              </div>

              <Form.Item className="hidden">
                <Button ref={submitEl} type="primary" htmlType="submit">
                  Inscripiton
                </Button>
              </Form.Item>
            </Form>
            <button
              type="button"
              className="transition duration-200 bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              onClick={submitFrom}
            >
              <span className="inline-block mr-2">Connexion</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1 ">
              <div className="text-center whitespace-nowrap">
                <button className="flex items-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <FiLock />
                  <span className="inline-block ml-1">
                    Mot de passe oublié ?
                  </span>
                </button>
              </div>
              <div className="text-center sm:text-right  whitespace-nowrap">
                <button className="flex items-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <FiHelpCircle />
                  <span className="inline-block ml-1">Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              {/* <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="inline-block ml-1">Back to your-app.com</span>
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
