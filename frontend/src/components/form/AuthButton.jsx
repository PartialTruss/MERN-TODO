const AuthButton = ({ backgroundColor, text, isdisabled }) => {
  return (
    <div className="w-full">
      <button
        className={`rounded-lg w-full h-10 font-semibold bg-[#3D405B] text-[#EDF7F4]`}
        type="submit"
        disabled={isdisabled}
      >
        {text}
      </button>
    </div>
  );
};

export default AuthButton;
