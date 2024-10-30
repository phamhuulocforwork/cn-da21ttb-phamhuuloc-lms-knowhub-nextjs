import React from "react";
import { SignInForm } from "./AuthForm";

const LoginModal = ({ handleShowModal }: { handleShowModal: () => void }) => {
  return (
    <div
      className="absolute top-0 flex h-full w-full items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-filter"
      onClick={handleShowModal}
    >
      <SignInForm
        headerLabel="Sign in"
        backButtonLabel="Back"
        backButtonHref="/"
        no_account="No account?"
      >
        Content
      </SignInForm>
    </div>
  );
};

export default LoginModal;
