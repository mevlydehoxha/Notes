import React, {useState,useRef, useEffect, useCallback} from "react";
import './styles/CreateNotes.scss'
import {MdTitle, MdCategory, MdDateRange} from 'react-icons/md'
import {AiOutlineFileText} from 'react-icons/ai'
import { FormattedMessage } from "react-intl";
export default function CreateNote({ showPopup, setShowPopup }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    const overlayClose = useRef();
    const closePopup = e => {
        if (overlayClose.current === e.target) {
          setShowPopup(false);
        }
      };
      const keyPress = useCallback(
        e => {
          if (e.key === 'Escape' && showPopup) {
            setShowPopup(false);
          }
        },
        [setShowPopup, showPopup]
      );
      useEffect(
        () => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
      );
      const array=localStorage.getItem('notesData')
      const notes = {
        title:title,
        content:content,
        category:category,
        date:date
      }
      console.log(title+"hhhhhhhhh")
      const sendData = () =>{
        if(title.trim().length === 0 || content.trim().length === 0 || category.trim().length === 0 || date.trim().length === 0){
          <p>Please fill the fields!</p>
        }
        else{
          const parsedArray2 = array ? JSON.parse(array) : [];
          const newArray1 = [...parsedArray2, notes];
          localStorage.setItem('notesData', JSON.stringify(newArray1));
          setShowPopup(false);
        }
    }
  return (
    <div>
        {showPopup ? (
            <div onClick={closePopup} ref={overlayClose} className="popup-background">
                <div className="container">
                    <h1><FormattedMessage id="notes" defaultMessage="Notes"/></h1>
                    <form>
                        <div  className="form">
                            <div className='input'>
                                <span><MdTitle/></span>
                                <input type="text" 
                                    id='title'
                                    name='title'
                                    value={title}
                                    onChange={(t) => setTitle(t.target.value)}
                                    placeholder='Title'
                                />
                            </div>
                            <div className='input'>
                                <span><AiOutlineFileText/></span>
                                <input type="text" 
                                    id='content'
                                    name='content'
                                    value={content}
                                    onChange={(c) => setContent(c.target.value)}
                                    placeholder='Content'
                                />
                            </div>
                            <div className='input'>
                                <span><MdCategory/></span>
                                <select 
                                    id='category'
                                    name='category'
                                    value={category}
                                    onChange={(c) => setCategory(c.target.value)}
                                >
                                    <option value="">Choose category</option>
                                    <option value="First Category">First Category</option>
                                    <option value="Second Category">Second Category</option>
                                    <option value="Third Category">Third Category</option>
                                </select>
                            </div>
                            <div className='input'>
                                <span><MdDateRange/></span>
                                <input type="date" 
                                    id='date'
                                    name='date'
                                    value={date}
                                    onChange={(d) => setDate(d.target.value)}
                                />
                            </div>
                        </div>
                        <div className="buttons">
                            <div className="button1" onClick={() => setShowPopup(prev => !prev)}><FormattedMessage id="cancel" defaultMessage="Cancel"/></div>
                            <div className="button2" onClick = {sendData}><FormattedMessage id="add" defaultMessage="Add"/></div>
                        </div>
                    </form>
                </div>
            </div> 
            )
        :null}
    </div>
  )
}
