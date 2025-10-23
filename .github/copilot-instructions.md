# GitHub Copilot Instructions for teachablemachinereem

This file contains project-specific instructions for GitHub Copilot to help generate consistent and high-quality code suggestions.

## Code Style and Formatting

- Follow consistent code formatting throughout the project
- Use clear and descriptive variable and function names
- Keep functions focused and modular
- Add proper indentation (use spaces, not tabs where applicable)
- Follow language-specific conventions (PEP 8 for Python, ESLint for JavaScript/TypeScript, etc.)

## Security Best Practices

- Never hardcode passwords, API keys, secrets, or sensitive data in the code
- Use environment variables for configuration and secrets
- Validate and sanitize all user inputs to prevent injection attacks
- Use secure protocols (HTTPS, SSH) for network communications
- Set secure cookie attributes: `httpOnly`, `secure`, `sameSite: strict`, and appropriate `maxAge`
- Keep dependencies up to date to avoid known vulnerabilities
- Handle errors gracefully without exposing sensitive information

## Testing Guidelines

- Write unit tests for new functionality
- Aim for good test coverage (ideally 80% or higher)
- Use descriptive test names that explain what is being tested
- Test both success and failure scenarios
- Mock external dependencies in unit tests
- Run tests before committing changes

## Documentation Standards

- Document all public functions and classes with clear descriptions
- Use appropriate documentation format (JSDoc for JavaScript/TypeScript, docstrings for Python)
- Include parameter descriptions and return value explanations
- Add inline comments for complex logic or non-obvious code
- Keep README.md up to date with project information
- Document setup instructions and dependencies

## Error Handling

- Use try-catch blocks appropriately
- Provide meaningful error messages
- Log errors with sufficient context for debugging
- Don't swallow exceptions without proper handling
- Use specific exception types rather than catching generic exceptions

## Best Practices

- Write clean, readable, and maintainable code
- Follow DRY (Don't Repeat Yourself) principle
- Use meaningful commit messages
- Keep commits focused and atomic
- Review your own code before submitting
- Consider performance implications of code changes
- Use modern language features and APIs appropriately
