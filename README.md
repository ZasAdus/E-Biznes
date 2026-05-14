<h1>Zadania z przedmiotu E-biznes

<h2>Zadanie 1 Docker<h2>
<t>Wszystkie obrazy znajdują się w jednym repozytorium, mają one adekwatne tagi takie jak oceny [repozytorium](https://hub.docker.com/repository/docker/zasadus/zadanie1/general)<t> <br>
✅ 3.0 obraz ubuntu z Pythonem w wersji 3.10 [filmik](https://youtu.be/ZD4RIdTVLd0)<br>
✅ 3.5 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem [filmik](https://youtu.be/dPjakPbsxUU)<br>
✅ 4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBCSQLite w ramach projektu na Gradle (build.gradle) [filmik](https://youtu.be/n2B3jk51ASs)<br>
✅ 4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle [filmik](https://youtu.be/ZNlgte9qkjQ)<br>
❌ 5.0 dodać konfigurację docker-compose <br>

<h2>Zadanie 2 Scala<h2>
<t>Wszystkie obrazy znajdują się w jednym repozytorium, mają one adekwatne tagi takie jak oceny [repozytorium](https://hub.docker.com/repository/docker/zasadus/zadanie2/general)<t> <br>
✅ 3.0 Należy stworzyć kontroler do Produktów [filmik](https://youtu.be/0Eh8PPpNbuA)<br>
✅ 3.5 Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy [filmik](https://youtu.be/8nPOmYXWcpY)<br>
❌ 4.0 Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD <br>
❌ 4.5 Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok <br>
❌ 5.0 Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD <br>

<h2>Zadanie 3 Kotlin<h2>
<t>obrazy znajdują się w jednym repozytorium, mają one adekwatne tagi takie jak oceny [repozytorium](https://hub.docker.com/repository/docker/zasadus/zadanie3/general)<t> <br>
✅ 3.0 Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor, która pozwala na przesyłanie wiadomości na platformę Discord [filmik](https://youtu.be/2ferEeXLHJA) <br>
❌ 3.5 Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota) <br>
❌ 4.0 Zwróci listę kategorii na określone żądanie użytkownika <br>
❌ 4.5 Zwróci listę produktów wg żądanej kategorii <br>
❌ 5.0 Aplikacja obsłuży dodatkowo jedną z platform: Slack lub Messenger <br>

<h2>Zadanie 4 Go<h2>
✅ 3.0 Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD [filmik](https://youtu.be/4EKrke0HCdk)<br>
❌ 3.5 Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy)<br>
❌ 4.0 Należy dodać model Koszyka oraz dodać odpowiedni endpoint <br>
❌ 4.5 Należy stworzyć model kategorii i dodać relację między kategorią, a produktem<br>
❌ 5.0 pogrupować zapytania w gorm’owe scope'y <br>

<h2>Zadanie 5 React<h2>
✅ 3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty oraz
Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w
Produktach powinniśmy pobierać dane o produktach z aplikacji
serwerowej [filmik](https://youtu.be/7RMKuKq1zYk) <br>
❌ 3.5 Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing <br>
❌ 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za
pomocą React hooks <br>
❌ 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz
kliencką na dockerze via docker-compose <br>
❌ 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS <br>

<h2>Zadanie 6 Testy <h2>
✅ 3.0 Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium (Kotlin, Python, Java, JS, Go, Scala) [filmik](https://youtu.be/g1ZUK8t6jvQ) <br>
❌ 3.5 Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50 asercji<br>
❌ 4.0 Należy stworzyć testy jednostkowe do wybranego wcześniejszego projektu z minimum 50 asercjami<br>
❌ 4.5 Należy dodać testy API, należy pokryć wszystkie endpointy z minimum jednym scenariuszem negatywnym per endpoint <br>
❌ 5.0 Należy uruchomić testy funkcjonalne na Browserstacku <br> <h1>


<h2>Zadanie 7 Sonar <h2>
✅ 3.0 Należy dodać litera do odpowiedniego kodu aplikacji serwerowej w hookach gita [filmik](https://youtu.be/kL_tdv9dvWI)<br>
❌ 3.5 Należy wyeliminować wszystkie bugi w kodzie w Sonarze (kod aplikacji serwerowej) <br>
❌ 4.0 Należy wyeliminować wszystkie zapaszki w kodzie w Sonarze (kod aplikacji serwerowej) <br>
❌ 4.5 Należy wyeliminować wszystkie podatności oraz błędy bezpieczeństwa w kodzie w Sonarze (kod aplikacji serwerowej) <br>
❌ 5.0 Należy wyeliminować wszystkie błędy oraz zapaszki w kodzie aplikacji klienckiej <br>

<h2>Zadanie 8 OAuth2<h2>

✅ 3.0 logowanie przez aplikację serwerową (bez Oauth2) [filmik](https://youtu.be/ns0snlTAjN8)
❌ 3.5 rejestracja przez aplikację serwerową (bez Oauth2)
❌ 4.0 logowanie via Google OAuth2
❌ 4.5 logowanie via Facebook lub Github OAuth2
❌ 5.0 zapisywanie danych logowania OAuth2 po stronie serwera