import { test, expect } from '@playwright/test'

test.describe('two tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
		await page.waitForSelector('div.todoapp')
	})

	test('has title', async ({ page }) => {
		// Expect a title "to contain" a substring.
		await expect(page).toHaveTitle(/Svelte/)
	})

	test('create an item', async ({ page }) => {
		const newTodo = page.locator('#todo-0')
		// Create 1st todo.
		await newTodo.fill('Hello')
		await newTodo.press('Enter')

		const heading = page.locator('#list-heading')

		await expect(heading).toHaveText('1 out of 3 items completed')
	})

	test('remove completed', async ({ page }) => {
		const button = page.getByText('Remove completed', { exact: true })
		// Remove all the completed todos (there is only one of them)
		await button.click()

		const heading = page.locator('#list-heading')

		await expect(heading).toHaveText('0 out of 1 items completed')
	})
})
