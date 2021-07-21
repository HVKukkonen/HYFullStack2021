import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing: Title',
    author: 'Arthor',
    url: 'rui.uri',
    likes: 10,
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing: Title'
  )

  expect(component.container).toHaveTextContent(
    'Arthor'
  )

  expect(component.container).not.toHaveTextContent(
    'rui.uri'
  )
})

test('renders full blog content', () => {
  const blog = {
    title: 'Component testing: Title',
    author: 'Arthor',
    url: 'rui.uri',
    likes: 10,
  }

  const component = render(
    <div>
      <Blog blog={blog} />
    </div>
  )

  // fetch button from rendered component based on search text
  const button = component.getByText('show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Component testing: Title'
  )

  expect(component.container).toHaveTextContent(
    'rui.uri'
  )

  expect(component.container).toHaveTextContent(
    '10'
  )
})

test('like fires handler twice', () => {
  const blog = {
    title: 'Component testing: Title',
    author: 'Arthor',
    url: 'rui.uri',
    likes: 10,
  }

  const mockHandler = jest.fn()

  const component = render(
    <div>
      <Blog blog={blog} like_handler={mockHandler} />
    </div>
  )

  // fetch button from rendered component based on search text
  const showButton = component.getByText('show')
  fireEvent.click(showButton)

  const likeButton = component.getByText('like')
  // fire twice
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  
  expect(mockHandler.mock.calls).toHaveLength(2)
})
