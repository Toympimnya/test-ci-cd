Feature: Health endpoint
  As a tester
  I want to check API availability
  So that I can be sure the server is alive

  Scenario: Health endpoint returns healthy
    Given the API server is running
    When I request "/health"
    Then response status should be 200
    And response body should contain "healthy"
