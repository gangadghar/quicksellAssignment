import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import {BsSliders} from 'react-icons/bs';
import {AiOutlineDown} from 'react-icons/ai';
import './App.css';

function App() {
  const api = "https://api.quicksell.co/v1/internal/frontend-assignment/";
  const [show, setshow] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const [dataTransform, setDataTransform] = useState(null);
  const [usernames, setusernames] = useState([]);
  const status = ["Backlog", "Todo", "In Progress", "Done", "Cancelled"];
  const priority = ["Urgent","High","Medium","Low","No priority"];

  const [op1, setop1] = useState("0");
  // 0 - By status
  // 1 - By user
  // 2 - By priority

  const [op2, setop2] = useState("0") // sorting options
  // 0 - priority (decreasing order)
  // 1 - title (ascending order)

  let getData = async () => {
    const prev = localStorage.getItem("list");
    if(prev) {
      setData(JSON.parse(prev));
      setloading(false);
    } else {
      axios.get(api)
        .then((res) => res.data)
        .then((list) => {
            localStorage.setItem("list",JSON.stringify(list));
            setData(list);
            setloading(false);
        })
    }
  }

  let remap = () => {
    // Data Ordering
    if(op2 == "0") data.tickets.sort((a, b) => b.priority - a.priority);
    else data.tickets.sort((a, b) => a.title.localeCompare(b.title));
    // Data Grouping
    switch (op1) {
      case "0":
        let update = [[], [], [], [], []]
        //   "Backlog", "Todo", "In Progress", "Done", "Cancelled"
        data.tickets.forEach((item) => {
          if(item.status == "Backlog") update[0].push(item);
          if(item.status == "Todo") update[1].push(item);
          if(item.status == "In progress") update[2].push(item);
          if(item.status == "Done") update[2].push(item);
          if(item.status == "Cancelled") update[2].push(item);
        });
        setDataTransform(update);
        break;

      case "1":
        let updateu = {};
        let names = [];
        let result = [];
        data.users.map((item, index) => {
          updateu[item.id] = index;
          names.push(item.name);
        })
        setusernames(names);
        names.map(i => result.push([]));
        data.tickets.forEach((item) => {
          result[updateu[item.userId]].push(item);
        })
        setDataTransform(result);
        break;

      case "2":
        let updatep = [[], [], [], [], []]
        //   4, 3, 2, 1, 0
        data.tickets.forEach((item) => {
          updatep[4-item.priority].push(item);
        });
        setDataTransform(updatep);
        break;

      default:
        setDataTransform({
          'Error': "No Data Available At The Moment"
        })
        break;
    }

  }

  useEffect(() => {
    getData();
    if(!loading) remap();
  }, [loading, op1, op2])
  

  if(loading) {
    return <>Loading....</>
  }

  return (
    <>
    <div className="display">
      <button onClick={() => setshow(!show)} className='hide'><span className='icon'><BsSliders /></span> &nbsp;&nbsp;Display </button>
      {show && <div className="hidden">
        <div className="g">
          <p>Grouping &nbsp;&nbsp;&nbsp;</p>
          <select name="grouping" onChange={(e) => setop1(e.target.value)} value={op1}>
            <option value="0">Status</option>
            <option value="1">Users</option>
            <option value="2">Priority</option>
          </select>
        </div>

        <div className="o">
          <p>Ordering &nbsp;&nbsp;&nbsp;</p>
          <select name="ordering" onChange={(e) => setop2(e.target.value)} value={op2}>
            <option value="0">Priority</option>
            <option value="1">Title</option>
          </select>
        </div>
      </div>}
    </div>
      <Card data={dataTransform} op={op1} topic={(op1 === "0")?status:(op1=== "2")?priority:usernames}/>
    </>
  );
}

export default App;
