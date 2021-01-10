import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestRobots, setSearchField } from '../actions'
import CardList from '../components/CardList'
import Scroll from '../components/Scroll'
import SearchBox from '../components/SearchBox'
import './App.css'

const App = () => {
  const searchField = useSelector((state) => state.searchRobots.searchField)
  const robots = useSelector((state) => state.requestRobots.robots)
  const isPending = useSelector((state) => state.requestRobots.isPending)
  const error = useSelector((state) => state.requestRobots.error)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestRobots())
  }, [dispatch])

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase())
  })

  const onSearchChange = (event) => {
    dispatch(setSearchField(event.target.value))
  }

  return isPending ? (
    <h1>Loading</h1>
  ) : (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardList robots={filteredRobots} />
      </Scroll>
    </div>
  )
}

export default App
