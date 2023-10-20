import React from 'react';
import './Card.css';
import { MdOutlineSignalCellularAlt, MdOutlineSignalCellularAlt2Bar,  MdOutlineSignalCellularAlt1Bar} from 'react-icons/md';
import {BsThreeDots} from 'react-icons/bs';
import {TfiSignal} from 'react-icons/tfi';
import {ImCancelCircle} from 'react-icons/im';
import {IoCheckmarkDoneCircleOutline} from 'react-icons/io5';
import {BsExclamationCircle,} from 'react-icons/bs';
import {TbProgress} from 'react-icons/tb';
import {BiCircle} from 'react-icons/bi';
import {FaRegUserCircle} from 'react-icons/fa';
import {FiAlertTriangle} from 'react-icons/fi';
import avatar from './avatar.png';

function Card(props) {
    let transform = props.data;
    let topic = props.topic;
    let op = props.op;

    let icons = {
        "0": [<BsExclamationCircle/>,<BiCircle />, <TbProgress />, <IoCheckmarkDoneCircleOutline />,<ImCancelCircle />],
        "1":[<FaRegUserCircle />, <FaRegUserCircle />, <FaRegUserCircle />,<FaRegUserCircle />, <FaRegUserCircle />],
        "2": [<BsThreeDots/>, <TfiSignal/>, <MdOutlineSignalCellularAlt />, <MdOutlineSignalCellularAlt2Bar />, <MdOutlineSignalCellularAlt1Bar />]
    }
    
  return (
    <>
    <div className="container">
    {
        transform &&
        transform.map((item, index) => {
            if(item.length > 0) {
                return (
                    <>
                    <div className='cards'>
                    <p className='title' key={index}><span className='iconv'>{icons[op][index]}</span>  {topic[index]} &nbsp;&nbsp; <span className='length'>{item.length}</span></p>
                    {
                        item.map(i => 
                            <div key={i.id} className="card">
                                <div className="main">
                                    <div className="one">
                                        <p className='titleId'>{i.id}</p>
                                        <p className='titlename'>{i.title}</p>
                                    </div>
                                    {(op != "1") &&<div className="two">
                                        <img src={avatar} alt="" />
                                    </div>}
                                </div>
                                <span className='tags'><span className='icontag'><FiAlertTriangle /></span> {i.tag[0]}</span>
                            </div>
                            )
                    }
                    </div>
                    </>
                )
            } else {
                return <div className='cards'><p className='title' key={index}><span className='iconv'>{icons[op][index]}</span> {topic[index]} &nbsp;&nbsp; <span className='length'>0</span></p></div>;
            }
        })
    }
    </div>
    </>
  )
}

export default Card;