# User Perspective - Linear Workflows

These diagrams show a simple, straight-line journey of how the data travels file-by-file starting from the User.

## 1. Chatbot Workflow

```mermaid
flowchart LR
    User(["👤 User (Types Question)"]) --> F["Frontend\n(Chatbot.jsx)"]
    F --> M["Backend\n(main.py)"]
    M --> C["API Route\n(chat.py)"]
    C --> A["AI Agent\n(chatbot.py)"]
    A --> T["Search Tool\n(custom_tools.py)"]
    T --> L["Groq LLM\n(llm_setup.py)"]
    L --> C2["API Route\n(chat.py)"]
    C2 --> UI(["🖥️ UI Response\n(Chatbot.jsx)"])
```

## 2. File Upload Workflow (PDF/Excel)

```mermaid
flowchart LR
    User(["👤 User (Uploads File)"]) --> F["Frontend\n(UploadPage.jsx)"]
    F --> M["Backend\n(main.py)"]
    M --> U["API Route\n(upload.py)"]
    U --> G["Pipeline\n(graph.py)"]
    G --> A1["Agent 1\n(extractor.py)"]
    A1 --> A2["Agent 2\n(validator.py)"]
    A2 --> A3["Agent 3\n(detector.py)"]
    A3 --> U2["API Route\n(upload.py)"]
    U2 --> DB["Database\n(supabase.py)"]
    DB --> UI(["🖥️ UI Success\n(UploadPage.jsx)"])
```
