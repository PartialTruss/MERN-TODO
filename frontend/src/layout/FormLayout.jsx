const FormLayout = ({ title, buttonText, children, onSubmit, linkText }) => {
  return (
    <div className="bg-[url('form-background2.svg')] bg-cover h-screen bg-no-repeat flex justify-center items-center">
      <div className="w-[25%] h-[26rem] bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mt-2">
          <div className=" w-5/6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
