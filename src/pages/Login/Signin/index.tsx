import React, { useRef } from "react";
import {
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  notification,
  Radio,
  Space,
  Table,
  Tooltip,
} from "antd";
import UtilisateurService from "../../../utils/services/utilisateur.service";

import WelcomeSVG from "../../assets/img/undraw_welcome.svg";
import SocialButton from "../../../components/Button/SocialButton";
import { NotificationInstance } from "antd/lib/notification";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
interface Props {}

const utilisateurService = new UtilisateurService();

const formItemLayout = {
  labelCol: { span: 14 },
  wrapperCol: { span: 24 },
};

const btnItemLayout = {
  wrapperCol: { span: 24 },
};

const handleSocialLogin = (user: any) => {
  console.log(user);
};
const Context = React.createContext({ name: "Default" });

const SigninScreen = (props: Props) => {
  const history = useHistory();
  const submitEl = useRef(null);
  const [api, contextHolder] = notification.useNotification();


  const submitFrom = () => {
    let btn : HTMLElement = submitEl.current as unknown as HTMLElement
    console.log();
    btn.click()
  }


  const openNotification = (
    type: "success" | "info" | "warning" | "error",
    title: string,
    message: string
  ) => {
    api[type]({
      message: `${title}`,
      description: message,
    });
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    values.utilisateurpresentation = "allo";
    const res = await utilisateurService
      .post(values, { social: false })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          openNotification(
            "error",
            "Element existant !",
            "l'email est déja utilisé sur la plateforme, veuillez vous connecter "
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          openNotification(
            "error",
            "Erreur interne !",
            "Veuillez Contacter l'administrateur de la plateforme"
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
    console.log(res);
    if (res && (res as AxiosResponse).status == 200) {
      openNotification(
        "success",
        "Inscription Reuissie !",
        "Vous avez reçu un mail de confirmation de creation de compte , veuillez l'ouvrir pour activer votre compte"
      );

      setTimeout(() => {
        history.push("/session/login");
      }, 3000);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    openNotification(
      "warning",
      "Formulaire Invalide",
      "Veuillez remplir correctement les champs du formulaire"
    );
  };

  return (
    <Context.Provider value={{ name: "Ant Design" }}>
      {contextHolder}
      <section className="bg-gray-200 body-font">
        <div className="container px-5 lg:px-20 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            {/* <img src={WelcomeSVG} alt="Welcome" className="w-1/4 mb-6"/> */}
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Création de compte
            </h1>
            <p className="leading-relaxed mt-4">
              Poke slow-carb mixtape knausgaard, typewriter street art gentrify
              hammock starladder roathse. Craies vegan tousled etsy austin.
            </p>
          </div>
          <div className="shadow-xl lg:w-96 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Inscription
            </h2>
            <Form
              {...formItemLayout}
              name="roleForm"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div className="relative mb-3">
                <Form.Item
                  label="Nom"
                  name="utilisateurnom"
                  rules={[
                    { required: true, message: "Veuillez entrez un nom !" },
                  ]}
                >
                  <Input className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </Form.Item>
              </div>

              <div className="relative mb-3">
                <Form.Item
                  label="Prenoms"
                  name="utilisateurprenom"
                  rules={[
                    { required: true, message: "Veuillez entrez un prenom !" },
                  ]}
                >
                  <Input className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </Form.Item>
              </div>

              <div className="relative mb-3">
                <Form.Item
                  label="Email"
                  name="utilisateuremail"
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
                  name="utilisateurpassword"
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

              <div className="relative mb-3">
                <Form.Item
                  label="Confirmer le Mot de passe"
                  name="cutilisateurpassword"
                  dependencies={["utilisateurpassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrez un mot de passe !",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          getFieldValue("utilisateurpassword") === value
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Les deux mots de passe ne correponsent pas!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </Form.Item>
              </div>

              <div className="relative mb-3">
                <Form.Item
                  label="Contact"
                  name="utilisateurcontact1"
                  rules={[
                    { required: true, message: "Veuillez entrez un contact !" },
                    //   {
                    //     pattern: /ˆ[0-9]*/,
                    //     message: "Veuillez entrez un contact valide !",
                    //   },
                  ]}
                >
                  <Input className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </Form.Item>
              </div>

              <Form.Item name="genre" label="Sexe">
                <Radio.Group>
                  <Radio value="H">Homme</Radio>
                  <Radio value="F">Femme</Radio>
                  <Radio value="A">Autre</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item className="hidden" {...btnItemLayout}>
                <Button ref={submitEl} type="primary" htmlType="submit">
                  Inscripiton
                </Button>
              </Form.Item>
            </Form>
           
            {/* <SocialButton
            provider="google"
            appId="AIzaSyB9KGYLGiVADZQlFTfUFcIL7PZCp9kJNjY"
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLogin}
            className="text-white mb-3 bg-red-400 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-300 rounded text-lg"
          >
            Google
          </SocialButton> */}

            <button
              type="submit"
              className="text-white mb-8 bg-green-400 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-300 rounded-lg text-lg"
              onClick={submitFrom}
          >
            Inscription
            </button>
            <button
              type="submit"
              className="text-white mb-3 bg-red-400 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-300 rounded-lg text-lg"
          >
            Google
            </button>
            <button
              type="submit"
              className="text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-300 rounded-lg text-lg"
            >
              Facebook
            </button>

            <p className="text-xs text-gray-500 mt-3">
              Literally you probably haven't heard of them jean shorts.
            </p>
          </div>
        </div>
      </section>
    </Context.Provider>
  );
};

export default SigninScreen;
