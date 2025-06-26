'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signInAction } from "@/lib/actions/auth.actions";

const CredentialsSignInForm = () => {


  const [data, action] = useActionState(signInAction, {
    success: false,
    message: '',
    errors: {}
  });

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>
    );
  };


  return <form action={action}>
    <div className='space-y-6'>
      <div className='space-y-4'>
        <Label htmlFor='username'>Username</Label>
        <Input
          id='username'
          name='username'
          type='text'
          required
          defaultValue={data?.data?.username || ''}
          className={data?.errors?.username ? 'border-red-500' : ''}
        />
        {data && !data.success && data.errors?.username && (
          <div className='text-center text-destructive'>{data.errors.username}</div>
        )}
      </div>
      <div className='space-y-4'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          name='password'
          type='password'
          required
          defaultValue={data?.data?.password || ''}
          className={data?.errors?.password ? 'border-red-500' : ''}
        />
        {data && !data.success && data.errors?.password && (
          <div className='text-center text-destructive'>{data.errors.password}</div>
        )}
      </div>
      <div>
        <SignInButton />
      </div>

      {data && !data.success && data.message && (
        <div className='text-center text-destructive'>{data.message}</div>
      )}
    </div>
  </form>

};

export default CredentialsSignInForm;
