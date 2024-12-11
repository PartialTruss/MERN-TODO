const Links = ({ src, description, href }) => {
  return (
    <>
      <ul>
        <li className="flex items-center">
          <img className="w-7 " src={src} alt="" />
          <a href={href} className="mx-2 text-[#F4F1DE]">
            {description}
          </a>
        </li>
      </ul>
    </>
  );
};

export default Links;
