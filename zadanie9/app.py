import json
import urllib.request
import streamlit as st

OLLAMA_URL = "http://localhost:11434"
OLLAMA_MODEL = "gemma2"

def ask_model(base_url: str, model: str, question: str) -> str:
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": question}],
        "stream": False,
    }
    request = urllib.request.Request(
        f"{base_url}/api/chat",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request) as response:
        data = json.loads(response.read().decode("utf-8"))
    return data.get("message", {}).get("content", "Brak odpowiedzi.")


st.set_page_config(page_title="Ollama Bot", layout="centered")
st.title("Zapytaj mnie o cokolwiek")
question = st.text_area("Twoje pytanie", height=100)
if st.button("Wyślij"):
    with st.spinner("Generuję..."):
        try:
            response = ask_model(OLLAMA_URL, OLLAMA_MODEL, question.strip())
            st.session_state["response"] = response
            st.session_state["error"] = ""
        except Exception as e:
            st.session_state["response"] = ""
            st.session_state["error"] = str(e)

if st.session_state.get("error"):
    st.error(st.session_state["error"])
if "response" in st.session_state:
    st.subheader("Odpowiedź")
    st.write(st.session_state["response"])