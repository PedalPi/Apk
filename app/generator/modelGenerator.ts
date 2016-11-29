export class BankGenerator {
    static generate(name : string) : any {
        return {
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
