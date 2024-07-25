import Image from "next/image";
import Link from "next/link";
import { MdLanguage } from "react-icons/md";

const partner: {
  name: string;
  path: string;
  width: number;
  height: number;
}[] = [
  {
    name: "Nasdaq",
    path: "/svgs/nasdaq-light.svg",
    width: 115,
    height: 44,
  },
  {
    name: "Volkswagen",
    path: "/svgs/volkswagen-light.svg",
    width: 44,
    height: 44,
  },
  {
    name: "Box",
    path: "/svgs/box-light.svg",
    width: 67,
    height: 44,
  },
  {
    name: "NetApp",
    path: "/svgs/netapp-light.svg",
    width: 115,
    height: 44,
  },
  {
    name: "Eventbrite",
    path: "/svgs/eventbrite-light.svg",
    width: 115,
    height: 44,
  },
];

const businessArray: {
  name: string;
  path: string;
}[][] = [
  [
    {
      name: "Udemy Business",
      path: "/",
    },
    {
      name: "Teach on Udemy",
      path: "/",
    },
    {
      name: "Get the app",
      path: "/",
    },
    {
      name: "About us",
      path: "/",
    },
    {
      name: "Contact us",
      path: "/",
    },
  ],
  [
    {
      name: "Careers",
      path: "/",
    },
    {
      name: "Blog",
      path: "/",
    },
    {
      name: "Help and Support",
      path: "/",
    },
    {
      name: "Affiliate",
      path: "/",
    },
    {
      name: "Investors",
      path: "/",
    },
  ],
  [
    {
      name: "Terms",
      path: "/",
    },
    {
      name: "Privacy policy",
      path: "/",
    },
    {
      name: "Cookie settings",
      path: "/",
    },
    {
      name: "Sitemap",
      path: "/",
    },
    {
      name: "Accessibility statement",
      path: "/",
    },
  ],
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="flex justify-between items-center py-3 px-12">
        <h2 className="py-3 pr-6 text-xl font-bold">
          Top companies choose{" "}
          <Link href={"/"} className="text-[#c0c4fc] hover:underline">
            Udemy Business
          </Link>{" "}
          to build in-demand career skills.
        </h2>
        <div className="flex">
          {partner.map((item, index) => (
            <Image
              key={index}
              src={item.path}
              width={item.width}
              height={item.height}
              alt={item.name}
              loading={"lazy"}
              className="my-3 mr-6 last:mr-0"
            />
          ))}
        </div>
      </div>
      <div className="border-t border-solid border-[#3e4143] pt-6 px-12">
        <div className="flex">
          <div className="flex basis-3/5">
            {businessArray.map((business, index) => (
              <ul key={index} className="flex flex-col basis-1/3">
                {business.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className="block py-1 text-sm hover:underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="basis-2/5 flex justify-end">
            <button className="btn btn-medium btn-secondary justify-start min-w-[140px] px-4 text-base border-white text-white">
              <MdLanguage className="icon icon-small border-white text-white" />
              <span className="ml-1">English</span>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center pt-16 pb-8">
          <Link href={"/"}>
            <Image
              src={"/logo-udemy-inverted.svg"}
              width={91}
              height={34}
              alt={"Udemy Logo"}
              loading={"lazy"}
            />
          </Link>
          <span className="text-xs">© 2024 Udemy, Inc.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
