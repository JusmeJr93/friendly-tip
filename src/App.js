import { useState } from "react";
export default function TipCalulator() {
  const [bill, setBill] = useState('');
  const [percentageTip1, setPercentageTip1] = useState(0);
  const [percentageTip2, setPercentageTip2] = useState(0);

  const tip = (percentageTip1 === 0 || percentageTip2 === 0)
    ? percentageTip1 + percentageTip2
    : Math.round((percentageTip1 + percentageTip2) / 2);

  function resetValues() {
    setBill('');
    setPercentageTip1(0);
    setPercentageTip2(0);
  }

  return (
    <div className="main">
      <Bill
        bill={bill}
        setBill={setBill}
      />
      <Tip
        who="you"
        percentageTip={percentageTip1}
        setPercentageTip={setPercentageTip1}
      />
      <Tip
        who="your partner"
        percentageTip={percentageTip2}
        setPercentageTip={setPercentageTip2}
      />
      <TotalToPay
        bill={bill}
        tip={tip}
      />
      <ResetButton resetValues={resetValues}>
        Reset 🔄
      </ResetButton>
    </div>
  );
}

function Bill({ bill, setBill }) {
  return (
    <section className="bill">
      <span>How much is the bill?</span>
      <input type="text"
        placeholder="Enter Bill"
        value={bill}
        onChange={e => setBill(Number(e.target.value))} />
    </section>
  );
}

function Tip({ who, percentageTip, setPercentageTip }) {
  return (
    <section className="tip">
      <span>How did {who} find the service?</span>
      <select value={percentageTip} onChange={e => setPercentageTip(Number(e.target.value))}>
        <option value="" defaultValue="" hidden>Select tip</option>
        <option value={0} >Horrible (0%)</option>
        <option value={5} >Okay (5%)</option>
        <option value={10} >Nice(10%)</option>
        <option value={15} >Fantastic(15%)</option>
        <option value={20} >Wonderful(20%)</option>
      </select>
    </section>
  );
}

function TotalToPay({ bill, tip }) {
  const total = (bill * (1 + (tip / 100))).toFixed(2);
  return <h3>You have to pay ${total} {bill == 0 ? '(bill + tip)' : `($${bill} + ${tip}%)`} </h3>
}

function ResetButton({ children, resetValues }) {
  return <button className="reset-button" onClick={resetValues}>{children}</button>
}


