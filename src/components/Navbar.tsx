import Link from 'next/link';

interface NavbarProps  {
  username?: string
  signOut?: () =>  void
}

function Navbar({ username, signOut }: NavbarProps) {

  return (
    <div className="navbar max-w-7xl px-4 pt-10 bg-base-200 text-center">
      <div className="navbar-start">
        <Link href="/">
          <a style={{ fontFamily: 'sacramento' }} className="text-7xl font-semibold">nts</a>
        </Link>
      </div>
      <div className="navbar-end">
        {(!username) ? 
          <Link href="/login">
            <a className="btn btn-outline">Login</a>
          </Link> : 
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  <span>{username[0]}</span>
                </div>
              </div> 
            </label> 
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li><Link href="/dashboard"><a>Dashboard</a></Link></li>
              <li onClick={signOut}><a>Sign out</a></li>
            </ul>
          </div> 
        }
      </div>
    </div>
  );
}

export default Navbar;