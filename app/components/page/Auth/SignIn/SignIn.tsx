import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import Typography from "../../../../components/common/Typography";
import React from "react";
import RememberMeCheckbox from "@/app/components/common/RememberMeCheckbox";
import { useSignIn } from "./useSignIn";

const SignIn = () => {
  const {
    handleLogin,
    error: loginError,
    isLoading,
    rememberMe,
    setRememberMe,
    register,
    handleSubmit,
    errors
  } = useSignIn();

  const onSubmit = async (data: { email: string; password: string }) => {
    await handleLogin(data.email, data.password);
  };

  return (
    <div className="flex flex-col items-center h-screen w-full">
      <div className=" max-w-[428px] max-md:px-6 md:max-w-[300px] w-full flex items-center flex-col gap-6 h-full justify-center">
        <Typography variant="h1" className=" mb-[14px]">
          {" "}
          Sign in{" "}
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-6 items-center justify-center'
        >
          <div className="w-full">
            <Input
              {...register('email')}
              classNames={{ container: 'w-full' }}
              placeholder='Email'
              error={errors.email?.message}
            />
          </div>
          <div className="w-full">
            <Input
              {...register('password')}
              classNames={{ container: 'w-full' }}
              placeholder='Password'
              type='password'
              error={errors.password?.message}
            />
          </div>
          <RememberMeCheckbox
            checked={rememberMe}
            onChange={setRememberMe}
          />
          <div className='flex flex-col gap-3 w-full'>
            {loginError ? (
              <Typography
                variant="small"
                className="text-center  text-[#EB5757]"
              >
                {loginError}
              </Typography>
            ) : null}
            <Button
              type='submit'
              className={'w-full'}
              variant='filled'
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
