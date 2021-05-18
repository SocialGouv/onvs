import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";

import {
  Checkbox,
  Input,
  OutlineButton,
  PrimaryButtton,
  SubTitleCard,
  TitleCard,
} from "@/components/lib";
import { RoughNotation } from "@/components/RoughNotation";
import Hospital from "@/components/svg/hospital.js";
import { useEffectToast } from "@/hooks/useEffectToast";
import useUser from "@/hooks/useUser";
import { isOpenFeature } from "@/utils/feature";
import fetcher from "@/utils/fetcher";

const AuthentCard = () => {
  const router = useRouter();
  const { mutateUser } = useUser({
    // redirectToIfSuccess: "/private",
  });

  const [error, setError] = React.useState("");

  useEffectToast(error);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isOpenFeature("FEATURE_ETS_FORM")) {
      return;
    }

    const { email, password } = Object.fromEntries(new FormData(e.target));

    const body = {
      email,
      password,
    };

    try {
      await mutateUser(
        fetcher("/api/auth/login", {
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        })
      );
      router.push("/private");
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setError({ message: "L'authentification est incorrecte. 😕" });
    }
  }

  return (
    <div className="w-full max-w-md px-4 py-2 text-gray-700 transition duration-500 ease-in transform bg-gray-100 border rounded shadow hover:scale-105 hover:border-gray-300">
      <Hospital className="w-auto h-12 mx-auto" alt="hôpital" />
      <TitleCard>
        <RoughNotation
          type="highlight"
          multiline="true"
          color="#bee3f8"
          show={false}
          animate={true}
          animationDuration={800}
        >
          Établissement, ordre, fédération, conférence
        </RoughNotation>
      </TitleCard>
      <SubTitleCard>Connectez-vous à votre compte</SubTitleCard>
      <form className="mt-5" onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Adresse courriel</label>
        <div>
          <Input
            ariaLabel="Email address"
            name="email"
            type="email"
            required
            placeholder="jeanne.lebrun@yahoo.fr"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="password2">Mot de passe</label>
          <Input
            aria-label="Password"
            name="password"
            type="password"
            required
            placeholder="Mot de passe"
          />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center hidden">
            <Checkbox id="rememberMe" />
            <label
              htmlFor="rememberMe"
              className="block ml-2 text-sm leading-5 text-gray-900"
            >
              Se souvenir de moi
            </label>
          </div>

          <div className="hidden text-sm leading-5">
            <Link href="/">
              <a className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
                Mot de passe oublié ?
              </a>
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center">
          <PrimaryButtton type="submit">Se connecter</PrimaryButtton>
        </div>
      </form>
      <div className="hidden">
        <SubTitleCard>{"Vous n'avez pas encore de compte ?"}</SubTitleCard>
        <div className="mt-4 text-center">
          <OutlineButton>Créer un compte</OutlineButton>
        </div>
      </div>
    </div>
  );
};

AuthentCard.propTypes = {
  flow: PropTypes.string,
};

export default AuthentCard;
