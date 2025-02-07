const FormLayout = ({ children, height }) => {
  return (
    <div className="bg-[url('form-background2.svg')] bg-cover h-screen bg-no-repeat flex justify-center items-center md:p-5">
      <div
        className={`w-[83%] md:w-[26%] ${height} bg-white rounded-xl shadow-lg `}
      >
        <div className="flex justify-center mt-2">
          <div className=" w-5/6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
