import { faBars, faTachometerAlt, faChartLine, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
     return (
          <html lang="en">
               <head />
               <body>
                    <div className="flex">
                         <nav className="flex-row">
                              <aside className=" bg-gray-100 md:w-60 w-10 h-screen">
                                   <div className="flex flex-1 space-x-5 px-7 py-3">
                                        <button>
                                             <FontAwesomeIcon icon={faBars} />
                                        </button>
                                        <div className="flex flex-1 font-bold text-lg">
                                             LOGO
                                        </div>
                                   </div>
                                   <div className="px-2">
                                        <div className="text-gray-400 text-sm">Analysis</div>
                                        <div className="px-3">
                                             <div className="space-x-3 bg-green-700 px-2 py-2">
                                                  <FontAwesomeIcon icon={faTachometerAlt} color='white' />
                                                  <Link href="/dashboard" className="text-sm text-white ">Dashboard</Link>
                                             </div>
                                             <div className="space-x-3 py-2 px-2">
                                                  <FontAwesomeIcon icon={faChartLine} />
                                                  <Link href="/sales" className="text-sm">Sales</Link>
                                             </div>
                                        </div>
                                        <div className="text-gray-400 text-sm py-2">Admin Access</div>
                                        <div className="px-5">
                                             <div className="space-x-3">
                                                  <FontAwesomeIcon icon={faUserGroup} />
                                                  <Link href="/usermanagement" className="text-sm">User Management</Link>
                                             </div>
                                        </div>
                                   </div>
                              </aside>
                         </nav>
                         <div className="flex-1 bg-gray-100">
                              {children}
                         </div>
                    </div>
               </body >
          </html >
     )
}

export default layout;