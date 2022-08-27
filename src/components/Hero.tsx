import Link from 'next/link';

interface HeroProps  {
  isAuth: boolean
}

function Hero({ isAuth }: HeroProps) {
  
  return (
    <div className="hero bg-base-200 pt-16">
      <div className="hero-content w-full flex-col lg:flex-row-reverse justify-between max-w-80">
        <img src="/notes.svg" className="max-w-sm" />
        <div>
          <h1 className="text-5xl font-bold">Note Taking System</h1>
          <p className="py-6">
           A modern note taking platform
          </p>
          {!isAuth ? 
            <Link href="/signup">
              <a className="btn btn-primary">Signup</a>
            </Link> : 
            <Link href="/dashboard">
              <a className="btn btn-primary">Dashboard</a>
            </Link> }
        </div>
      </div>
    </div>
  );
}

export default Hero;