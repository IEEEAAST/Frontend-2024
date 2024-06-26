import { CardAboutUs } from "./CardAboutUs";

const branchQuotes = [
    {
      image:
        "https://www.davidchang.ca/wp-content/uploads/2020/09/David-Chang-Photography-Headshots-Toronto-61-1536x1536.jpg",
      quote:
        "“ – The amazing performance of the team never fails my expectations. They’re simply a bolt of fire. They do it with dedication, passion and freedom. Overcoming problems and issues is just their motor function.”",
      logo: "https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png",
      name: "Prof. Dr. Akram Something",
      position: "Dean of Engineering",
      company: "company",
      percentage: "100%",
      description: "dedication.",
    },
    {
      image:
        "https://www.davidchang.ca/wp-content/uploads/2020/09/David-Chang-Photography-Headshots-Toronto-61-1536x1536.jpg",
      quote:
        "“ – The amazing performance of the team never fails my expectations. They’re simply a bolt of fire. They do it with dedication, passion and freedom. Overcoming problems and issues is just their motor function.”",
      logo: "https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png",
      name: "Prof. Dr. Akram Something",
      position: "Dean of Engineering",
      company: "company",
      percentage: "100%",
      description: "dedication.",
    },
    {
      image:
        "https://www.davidchang.ca/wp-content/uploads/2020/09/David-Chang-Photography-Headshots-Toronto-61-1536x1536.jpg",
      quote:
        "“ – The amazing performance of the team never fails my expectations. They’re simply a bolt of fire. They do it with dedication, passion and freedom. Overcoming problems and issues is just their motor function.”",
      logo: "https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png",
      name: "Prof. Dr. Akram Something",
      position: "Dean of Engineering",
      company: "company",
      percentage: "100%",
      description: "dedication.",
    },
  ];

export const AboutUs = () => {
  return (
    <div className='flex flex-col gap-4 w-full px-[205px] container mx-auto'>
        <p className="font-bold text-4xl mt-20 my-5"> What People Say About Us</p>
        {
            branchQuotes.map((data,index)=>{
                return <CardAboutUs key={index} {...data}/>
            })
        }
     
    </div>
  )
}