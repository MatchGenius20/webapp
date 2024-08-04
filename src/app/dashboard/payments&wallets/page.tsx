'use client';
import { useState } from 'react';
import CountUp from 'react-countup';

interface PaymentMethod {
  id: number;
  cardNumber: string;
  bank: string;
  expiry: string;
}

const PaymentsAndWallets: React.FC = () => {
  const [walletBalance] = useState(560);
  const [amountSpent] = useState(150);
  const [totalSessions] = useState(6);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, cardNumber: '4242 4242 4242 4242', bank: 'ABC Bank, New Delhi, India', expiry: '11/2028' },
    { id: 2, cardNumber: '4242 4242 4242 4242', bank: 'ABC Bank, New Delhi, India', expiry: '11/2028' },
    { id: 3, cardNumber: '4242 4242 4242 4242', bank: 'ABC Bank, New Delhi, India', expiry: '11/2028' },
  ]);
  const [selectedMethods, setSelectedMethods] = useState<number[]>([]);

  const handleDelete = () => {
    setPaymentMethods(paymentMethods.filter(method => !selectedMethods.includes(method.id)));
    setSelectedMethods([]);
  };

  const handleSelect = (id: number) => {
    setSelectedMethods(prevSelected => 
      prevSelected.includes(id) ? prevSelected.filter(methodId => methodId !== id) : [...prevSelected, id]
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-around mb-6 space-y-4 md:space-y-0 bg-[#EBEBFE] rounded-md w-4/5 mx-auto">
        <div className="relative w-60 mx-2 ">
          <div className="p-4 md:p-6 rounded-lg ">
            <div className="p-3 md:p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-sm md:text-sm font-semibold ">Wallet Balance</div>
              <div className="text-2xl md:text-4xl font-bold text-center text-[#443EDE]">
                $<CountUp end={walletBalance} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-60  mx-2">
          <div className="p-4 md:p-6  rounded-lg">
            <div className="p-3 md:p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform  justify-center">
              <div className="text-sm md:text-sm font-semibold">Amount Spent</div>
              <div className="text-2xl md:text-4xl font-bold text-center text-[#443EDE] ">
                $<CountUp end={amountSpent} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-60 mx-2">
          <div className="p-4 md:p-6  rounded-lg">
            <div className="p-3 md:p-4  bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-sm md:text-sm">Total Sessions</div>
              <div className="text-2xl md:text-4xl font-bold text-center text-[#443EDE]">
                <CountUp end={totalSessions} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl md:text-2xl font-semibold ">Payment Methods</h2>
        <h3 className='mb-3 md:text-sm text-xs text-[#7D7D7B]'>Select to Remove or edit your Method</h3>
        {paymentMethods.map(method => (
          <div key={method.id} className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id={`method-${method.id}`} 
              className="mr-2" 
              checked={selectedMethods.includes(method.id)}
              onChange={() => handleSelect(method.id)}
            />
            <label htmlFor={`method-${method.id}`} className="flex-1 flex justify-between text-sm md:text-md shadow-[#F4F4FE]">
              Test Card ({method.cardNumber})
              <span>{method.bank} | Expiry {method.expiry}</span>
            </label>
          </div>
        ))}
        <div className="flex justify-end mt-4 gap-2">
           <button
            onClick={handleDelete}
            className="bg-[#EFEFFE] text-[#443EDE] px-4 py-2 md:px-6 md:py-3 rounded-lg text-md md:text-lg "
          >
            Add
          </button>
          <button
            className="bg-[#EFEFFE] text-[#443EDE] px-4 py-2 md:px-6 md:py-3 rounded-lg text-md md:text-lg "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsAndWallets;
