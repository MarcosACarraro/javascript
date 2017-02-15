var base = (function () {
    var _datasource = [];

    var _load = function () {
        var _item1 = { id: 1, nome: "Marcos", cidade: "Americana", situacao: "Novo", idTipo: 1 };
        var _item2 = { id: 2, nome: "Joao", cidade: "Piracicaba", situacao: "Novo", idTipo: 1 };
        var _item3 = { id: 3, nome: "Pedro", cidade: "Paris", situacao: "Novo", idTipo: 2 };
        var _item4 = { id: 4, nome: "Maria", cidade: "capitolio", situacao: "Novo", idTipo: 2 };
        var _item5 = { id: 5, nome: "Jose", cidade: "Sao paulo", situacao: "Novo", idTipo: 3 };
        var _item6 = { id: 6, nome: "Paulo", cidade: "Jundiai", situacao: "Novo", idTipo: 3 };
        var _item7 = { id: 7, nome: "Lucia", cidade: "Americana", situacao: "Novo", idTipo: 3 };
        var _item7 = { id: 8, nome: "Leticia", cidade: "Sao Pedro", situacao: "Novo", idTipo: 3 };
        var _item8 = { id: 9, nome: "Maria Joaquina", cidade: "Sao Pedro", situacao: "Novo", idTipo: 3 };
        var _item9 = { id: 10, nome: "Aparecida", cidade: "Sao Pedro", situacao: "Novo", idTipo: 3 };

        _datasource.push(_item1);
        _datasource.push(_item2);
        _datasource.push(_item3);
        _datasource.push(_item4);
        _datasource.push(_item5);
        _datasource.push(_item6);
        _datasource.push(_item7);
        _datasource.push(_item8);
        _datasource.push(_item9);
    }

    var _list = function () {
        return _datasource;
    }
  

    return {
        load: _load,
        list: _list

    }
})();