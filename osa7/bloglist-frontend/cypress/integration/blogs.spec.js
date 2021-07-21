// make new user
const testUser = {
  username:'tester',
  password: 'password'
};

const blogs = [
  {
    title: 'great testA',
    author: 'authorA',
    url: 'urlA'
  },
  {
    title: 'great testB',
    author: 'authorB',
    url: 'urlB'
  }
]
;

const addBlog = (blog) => {
  cy.contains('new note').click()
  cy.get('#blogform-title').type(blog.title)
  cy.get('#blogform-author').type(blog.author)
  cy.get('#blogform-url').type(blog.url)
  cy.get('#blogform-create').click()
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application');
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type(testUser.username)
      cy.get('input:last').type(testUser.password)
      cy.contains('login').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type(testUser.username)
      cy.get('input:last').type('wrong')
      cy.contains('login').click()
      cy.contains('blogs').should('not.exist')
    })
  })

  describe('After login', function() {
    beforeEach(function() {
      cy.get('input:first').type(testUser.username)
      cy.get('input:last').type(testUser.password)
      cy.contains('login').click()
    })

    it('logged can add blog', function() {
      addBlog(blogs[0])
      cy.contains(blogs[0].title)
    })
  })

  describe('After blog addition', function() {
    beforeEach(function() {
      cy.get('input:first').type(testUser.username)
      cy.get('input:last').type(testUser.password)
      cy.contains('login').click()
      addBlog(blogs[0])
      addBlog(blogs[1])
    })

    it('like blog', function() {
      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains(1)
    })

    it('can remove', function() {
      cy.contains(blogs[0].title).parent().find('remove').click()
      cy.contains(blogs[1].title).parent().find('remove').click()
      cy.contains(blogs[0].title).should('not.exist')
      cy.contains(blogs[1].title).should('not.exist')
    })

    it.only('ordered by likes', function() {
      // first blog is not blogs[1]
      cy.get('#blog-element').contains(blogs[1].title).should('not.exist')
      // after liking blogs[1], it's the 1st one
      cy.contains(blogs[1].title).contains('show').click()
      cy.contains('like').click()
      cy.get('#blog-element').contains(blogs[1].title)
    })
  })
})