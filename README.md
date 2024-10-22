# Game of Life - Nuxt 3, Tailwind CSS & TDD

Dies ist eine Implementierung des **Game of Life** in **Nuxt 3** mit **Vue 3**, **Tailwind CSS** und testgetriebener Entwicklung (**TDD**) unter Verwendung von **Vitest** für die Tests. Das Ziel dieses Projekts ist es, ein vollständiges Beispiel für TDD mit 100% Testabdeckung zu erstellen.

## Projektübersicht

Das **Game of Life** ist ein zellulärer Automat, der nach den folgenden Regeln funktioniert:

1. Eine lebende Zelle mit weniger als zwei lebenden Nachbarn stirbt (Unterbevölkerung).
2. Eine lebende Zelle mit zwei oder drei lebenden Nachbarn bleibt am Leben.
3. Eine lebende Zelle mit mehr als drei lebenden Nachbarn stirbt (Überbevölkerung).
4. Eine tote Zelle mit genau drei lebenden Nachbarn wird wiederbelebt (Wiederbelebung).

Dieses Projekt implementiert diese Regeln, wobei das Spielfeld dynamisch in Vue gerendert wird und das Styling durch Tailwind CSS unterstützt wird.

## Technologien

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)

## Setup

### 1. Klone das Repository:

```bash
git clone https://github.com/your-username/game-of-life-nuxt.git
cd game-of-life-nuxt
```
