import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@material-tailwind/react";
import { useSession, signIn } from "next-auth/react";
import Loading from '@/components/loading';

export default function Home() {
  const { data: session, status } = useSession();  
  const router = useRouter();

  useEffect(() => {
      if(status === 'authenticated') router.push('/users');
  }, [session]);

  if(status === 'loading') return <Loading className="w-screen h-screen -translate-y-12" />;
  
  const handleSignIn = (provider) => {
    signIn(provider, { callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/users` });
  }

  return (
    <main className="min-h-screen min-w-screen bg-[#fafafb] flex justify-center items-center">
      <div className="space-y-3">
          <img src="/assets/logo.svg" alt="Logo" className="w-full" />
          <Button 
              size="lg" 
              color="white" 
              className="w-full flex items-center gap-3 px-12 py-3 normal-case tracking-wide shadow-md border border-gray-400 rounded-none"
              onClick={() => handleSignIn("google")}
          >
              <img src="/assets/signin/google.svg" alt="Google Logo" className="h-6 w-6" />
              <span>Sign in with Google</span>
          </Button>
          <Button 
              size="lg" 
              color="white" 
              className="w-full flex items-center text-white bg-[#050708] hover:bg-[#050708]/90 gap-3 px-12 py-3 normal-case tracking-wide shadow-md border border-gray-400 rounded-none"
              onClick={() => handleSignIn("github")}
          >
              <img src="/assets/signin/github-white.svg" alt="Google Logo" className="h-6 w-6" />
              <span>Sign in with Github</span>
          </Button>
      </div>
    </main>
  )
}
