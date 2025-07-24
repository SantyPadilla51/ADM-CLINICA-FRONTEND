const BtnVolver = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="m-4 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>

      <span className="font-semibold">Volver</span>
    </button>
  );
};

export default BtnVolver;
