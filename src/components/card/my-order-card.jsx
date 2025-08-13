import react from 'react'

const MyOrderCard = ({ orderId, paymentMethod, totalAmount, products, status, date }) => {
  return (
    <div className='border border-gray-300 p-4 py-5 rounded-md mb-10'>
      {/* Order info */}
      <p className="flex flex-wrap justify-between items-center mb-7 text-gray-400 max-md:flex-col max-md:items-start">
        <span className="text-sm">OrderId: {orderId}</span>
        <span>Payment: {paymentMethod}</span>
        <span className="font-bold text-black">Total Amount: {totalAmount}$</span>
      </p>

      {/* Products List */}
      {products.map((product, index) => (
        <div key={index} className="flex justify-between gap-3 mb-4 max-md:flex-col max-md:items-start max-md:gap-2">
          <div className="flex gap-5">
            <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center flex-shrink-0">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-16 h-16 object-cover"
              />
            </div>
            <div className='flex flex-col justify-center flex-grow'>
              <p className="text-xl font-medium">{product.title}</p>
              <span className="text-gray-400">Category: {product.category}</span>
            </div>
          </div>
          {/* Quantity, Status, Amount */}
          <div className="flex flex-col justify-center text-gray-400">
            <p className="text-sm whitespace-nowrap">
              <span className="font-medium">Quantity: {product.quantity}</span>
            </p>
            <p className="text-md whitespace-nowrap">
              <span className="">Status:</span>{" "}
              <span className="">{status}</span>
            </p>
            <p className="text-md">
              <span className="font-medium">Date: {date}</span>
            </p>
          </div>
          <div className='flex justify-center items-center'>
            <p className="text-md whitespace-nowrap">
              <span className="text-green-500">Amount: {product.price}$</span>
            </p>
          </div>
        </div>
      ))}

      {/* Status and Date */}
      {/* <div className="flex justify-between items-center text-gray-400 mt-4 max-md:flex-col max-md:items-start max-md:gap-1">
        <p>Status: {status}</p>
        <p>Date: {date}</p>
      </div> */}
    </div>
  );
};

export default MyOrderCard;
