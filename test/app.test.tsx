
import React from 'react'
import App from '../src/App'
import { fireEvent, render, screen  } from "@testing-library/react"
import { describe, expect, it } from "vitest"



describe("App", () => {

	it("should render", () => {
		render(<App />)
	})

	it("should render title correctly", () => {
		screen.getByText('ToDo List')
	})

	it("should render new todo form", () => {
    screen.getByRole('new-todo-form')
		screen.getByText('Create', { selector: 'button' })

    const input = screen.getByPlaceholderText('New Todo')

    expect(input.tagName).toBe('INPUT')

  })

	it("should render filter select correctly", () => {
    const select = screen.getByRole('select-by-completed-status')
    const options = select.children

    expect(options.length).toBe(3)
    expect(options[0].getAttribute('value')).toBe('all')
    expect(options[1].getAttribute('value')).toBe('actives')
    expect(options[2].getAttribute('value')).toBe('completed')
  })

	it("should create todo", () => {

    const input:HTMLInputElement = screen.getByPlaceholderText('New Todo')
		const button = screen.getByText('Create', { selector: 'button' })
    const grid = screen.getByRole('todos-grid')

    input.value = 'New Todo'
    fireEvent.click(button)

    // Refresh the input value after the creation
    expect(input.value).toBe('')
    expect(grid.children.length).toBe(1)

    screen.getByText('New Todo', { selector: '[role="todo"] [role="todo-name"]' })
  })

	it("should set the todo completed", () => {
    const completeButton = screen.getByText('Complete', { selector: '[role="todo"] button' })
    fireEvent.click(completeButton)
    screen.getByText('Activate', { selector: '[role="todo"] button' })
  })

	it("should render todos info correctly", () => {
    screen.getByRole('todos-info')
    screen.getByText('Actives: 0')
    screen.getByText('Completed: 1')
  })

	it("should delete todo", () => {
    const deleteButton = screen.getByText('Delete', { selector: '[role="todo"] button' })
    const grid = screen.getByRole('todos-grid')

    fireEvent.click(deleteButton)
    expect(grid.children.length).toBe(0)
  })
})


