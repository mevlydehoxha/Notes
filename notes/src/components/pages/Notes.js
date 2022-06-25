import React from 'react'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import './styles/Notes.scss'
import CreateNote from './CreateNote.js'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import {BsDot, BsSearch} from 'react-icons/bs'

const Notes = () => {
    const [showPopup, setShowPopup] = useState(false);
    const openPopup = () => {
        setShowPopup(prev => !prev);
    };
    const notesData=JSON.parse(localStorage.getItem('notesData'));
    const [search, setSearch] = useState('');
    return (
        <div className='notes'>
            <div className='create-note' onClick={openPopup}>
                <FormattedMessage id="create-note" defaultMessage="Create Note"/>
            </div>
            <CreateNote showPopup={showPopup} setShowPopup={setShowPopup}/>
            <div className="search">
              <span><BsSearch/></span>
              <input type="text" 
                  id='search'
                  name='search'
                  value={search}
                  onChange={(s) => setSearch(s.target.value)}
                  placeholder='Search note'
              />
              <button type='submit'>
                  <FormattedMessage id='search' defaultMessage='Search' />
              </button>
            </div>
            <div>
                <h1><FormattedMessage id="all-notes" defaultMessage="All Notes"/></h1>
                <Tabs>
                    <TabList>
                        {notesData ? notesData.filter(props => {
                            if (search === '') {
                                return props;
                            } 
                            else if (props.title.toLowerCase().includes(search.toLowerCase())) {
                                return props;
                            }
                        }).map((props)=>{
                            return(
                               <Tab key={props.content}>
                                    <h3>{props.title}</h3>
                                </Tab>
                            )
                        }) : null}
                    </TabList>
                    <div className='panel'>
                        {notesData ? notesData.map((props)=>{
                            return(
                                <TabPanel key={props.content}>
                                    <h3>{props.title}</h3>
                                    <div className='category-date'>
                                        <p>{props.category}</p>
                                        <span><BsDot/></span>
                                        <p>{props.date}</p>
                                    </div>
                                    <p>{props.content}</p>
                                </TabPanel>
                            )
                        }) : null}
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default Notes
