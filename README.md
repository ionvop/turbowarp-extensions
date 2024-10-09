# turbowarp-extensions
A collection of extensions for Turbowarp, the better version of Scratch.

## MultiTouch
*Deprecated in favor of ObviousAlexC's [Sensing Plus](https://turbowarp.org/editor?extension=https://extensions.turbowarp.org/obviousAlexC/SensingPlus.js) extension*

## GPT
*Deprecated in favor of [OpenRouter extension](#openrouter)*

`set [option] to [value]` Sets a parameter for initializing or modifying a request.

- `option` The parameter that will be set.
  - `system` The system prompt.
  - `pre-prompt` The text that will be added before the message but will not be included in the resulting chat log. Useful for instructing the model on how they should respond but may have less priority than `mid-prompt`.
  - `mid-prompt` The text that will be added after your message but will not be included in the resulting chat log. Useful for instructing the model on how they should respond and may have more priority over `pre-prompt`.
  - `post-prompt` The text that will be used as a second request after the reponse for the initial request has been made, but only the message for the initial request and the response to the second request will be included in the resulting chat log. Useful for instructing the model to repeat their statement in a specific behavior. However, it may double the process time and the usage of tokens if set.
  - `api key` Your api key that will be used in making the request. **Must be set first**
  - `api url` The chat completions url that you're making a request to. (Default: `https://api.openai.com/v1/chat/completions`)
  - `model` The model that will be used for your request. (Default: `gpt-3.5-turbo`)

- `value` Sets the value of the parameter.

`set memory to [value]` Sets the number of messages in the given chat log that will be used in making the request. This is to avoid reaching past the max tokens accepted by the model as well as reducing the amount of tokens used in the request especially for long-term conversations.

- `value` The value of the parameter. If set to 0, all messages in the given chat log will be used in making the request. (Default: `0`)

`add [content] as [role] to [list]` Adds a message object to a list.

- `content` Sets the content of the message.
- `role` Sets the role of the message.
  - `user` Makes it as if the user has sent the message.
  - `assistant` Makes it as if the model has sent the message.

- `list` Sets which list the message object will be appended to.
  - `log` A list of message objects that will give context to the model and will be included in the resulting chat log.
  - `dialogue` A list of message objects that will give context to the model but will not be included in the resulting chat log.
 
`[method] json array [content] to [list]` Sets or adds a JSON array to a list.

- `method` Sets how the value will be handled.
  - `set` Clears the list before adding the given array.
  - `add` Appends the given array to the list.
 
- `content` Sets the content of the message.
- `role` Sets the role of the message.
  - `user` Makes it as if the user has sent the message.
  - `assistant` Makes it as if the model has sent the message.

- `list` Sets which list the message object will be appended to.
  - `log` A list of message objects that will give context to the model and will be included in the resulting chat log.
  - `dialogue` A list of message objects that will give context to the model but will not be included in the resulting chat log.
 
`clear [list]` Clears the selected list.

- `list` Sets which list the message object will be appended to.
  - `log` A list of message objects that will give context to the model and will be included in the resulting chat log.
  - `dialogue` A list of message objects that will give context to the model but will not be included in the resulting chat log.
 
`send [message] and wait` Sends a request to the model and waits for the response.

- `message` Sets your message that will be appended to your given chat log.

`get data of [response]` Returns the data of the response.

- `response` Sets which type of data from the response that will be retrieved.
  - `reply` The model's text response.
  - `result` A JSON array of message objects that represents the resulting chat log.
  - `full-prompt` A JSON array of message objects that was used in making the request.
  - `response` A JSON object that contains the model's response.
 
`get current [list]` Returns the current data of the selected list.

- `list` Sets which list the message object will be appended to.
  - `log` A list of message objects that will give context to the model and will be included in the resulting chat log.
  - `dialogue` A list of message objects that will give context to the model but will not be included in the resulting chat log.

## OpenRouter

### API Key Setup

`set api key to [key]`  
Define the API key required to authenticate with the OpenRouter service.  
- `key`: A string representing the API key, typically starting with `sk-or-v1-...`.

### Model Selection

`set model to [model]`  
Select the model to use for generating responses.  
- `model`: The model identifier, such as `"gpt-4o-mini"` or `"gpt-3.5-turbo"`. 

`model`  
Retrieve the currently selected model.

### Message Management

`set messages to [history]`  
Set the conversation history or messages to be sent to the model.  
- `history`: A JSON string representing the list of message objects (e.g., `[{"role": "user", "content": "Hello"}]`).

`add [content] as [role] to messages`  
Add a new message to the conversation history.  
- `content`: The message text to be added (e.g., "Hello, world!").  
- `role`: The role of the message sender.
  - `system`: The system sets up the behavior of the assistant.
  - `user`: The user interacting with the model.
  - `assistant`: The response generated by the model.

`insert [content] as [role] at item [index] in messages`  
Insert a message at a specific position in the conversation history.  
- `content`: The message text to be inserted (e.g., "Hello, world!").  
- `role`: The role of the message sender.
  - `system`: The system sets up the behavior of the assistant.
  - `user`: The user interacting with the model.
  - `assistant`: The response generated by the model.  
- `index`: The position (1-based index) where the message will be inserted in the message history.

`delete item [index] in messages`  
Delete a message at a specific position in the message history.  
- `index`: The position (1-based index) of the message to be deleted.

`delete all messages`  
Clear all messages from the conversation history.

`messages`  
Retrieve the current conversation history as a JSON string.

`length of messages`  
Retrieve the number of messages in the conversation history.

### Parameter Management

`set parameter [param] to [value]`  
Set a specific parameter to adjust model behavior.  
- `param`: The name of the parameter (e.g., `temperature`, `top_p`).  
- `value`: The value to assign to the parameter (e.g., `1.0` for `temperature`).

`remove parameter [param]`  
Remove a specific parameter from the configuration.  
- `param`: The name of the parameter to remove (e.g., `temperature`).

`reset parameters`  
Clear all parameters, resetting them to their default state.

`parameters`  
Retrieve the current set of parameters as a JSON string.

### Sending Messages

`send messages and wait`  
Send the current conversation history and parameters to the model for processing and wait for a response.

`response`  
Retrieve the response generated by the model.

### Resetting State

`reset all`  
Reset all internal states, including the API key, model, conversation history, parameters, and response, to their initial values.