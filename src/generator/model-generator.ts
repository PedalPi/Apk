export class BankGenerator {
    static generate(name : string) : any {
        return {
            "index": -1,
            "name": name,
            "pedalboards": [PedalboardGenerator.generate('Example pedalboard')]
        };
    }
}

export class PedalboardGenerator {
    static generate(name : string) : any {
        return {
            "name": name,
            "effects": [],
            "connections": []
        };
    }
}
