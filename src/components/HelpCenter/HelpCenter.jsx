const HelpCenter = () => {
  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold text-[#FF9800] mb-4">
        Help Center
      </h1>
      <p className="text-gray-600">
        This page is available for logged-in users to get help related to their account and actions.
      </p>
      <ul className="mt-4 list-disc pl-6 text-gray-700">
        <li>Account issues</li>
        <li>Review related problems</li>
        <li>Report bugs</li>
      </ul>
    </div>
  );
};

export default HelpCenter;
