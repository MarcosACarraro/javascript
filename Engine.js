//http://getbootstrap.com/css/#forms-control-validation
//http://stackoverflow.com/questions/36195938/triggering-has-error-class-of-bootstrap-using-jquery

var mGrid = (function () {
    var _reverse = false;
    var _mainDiv
    var _id = 0;
    var _idEdit = 0;
    var _idExcluir = 0;
    var _datasource = [];
    var _table = {};
    var _divEdit;
    var _txtNome = {};
    var _txtCidade = {};
    var _divConfirm;
    var _lblMensagem;
    var _divNome;
    var _divCidade;
    var _ddlTipo = {};
    var _datepicker = {};
    var _divData;

    var _create = function (div) {


        _mainDiv = window.document.getElementById(div);
  
        _createEdit.call(this);
        _createConfirm.call(this);
        _table = window.document.createElement("table");
        _table.setAttribute("class", "table");

        var row = _table.insertRow(0);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);
        cell0.innerHTML = "<div><a href='#' onClick='javascript:mGrid.sort(\"id\");return false;'>ID</a></div>";
        cell1.innerHTML = "<div><a href='#' onClick='javascript:mGrid.sort(\"nome\");return false;'>Editar</a></div>";
        cell2.innerHTML = "Situcao";
        cell3.innerHTML = "<div><a href='#' onClick='javascript:mGrid.sort(\"cidade\");return false;'>Cidade</a></div>";
        cell4.innerHTML = "Editar";
        cell5.innerHTML = "Excluir";
        cell6.innerHTML = "Editar";
        _mainDiv.appendChild(_table);

        var _divFooter = window.document.getElementById("divButton");

        var _btnNew = window.document.createElement("button");
        _btnNew.setAttribute("class", "btn btn-primary");
        _btnNew.innerHTML = "Novo";
        _btnNew.setAttribute("name", "btnNew");
        _btnNew.setAttribute("onclick", "javascript:mGrid.newItem();")
        _divFooter.appendChild(_btnNew);

        //_load.call(this);

        base.load();

        _datasource = base.list();

       
        _tableDataBind.call(this);
    }

    var _sort = function (field) {
        if (field === "id") {
            _datasource = _datasource.sort(sort_by("id", parseInt));
        }else{
            _datasource = _datasource.sort(sort_by(field, function (a) { return a.toUpperCase() }));
        }
        _tableDataBind.call(this);
    }

    

    var sort_by = function (field,  primer) {
        var key = primer ?
            function (x) { return primer(x[field]) } :
            function (x) { return x[field] };

        intReverse = _reverse ? 1 : -1;
        _reverse = !_reverse;

        return function (a, b) {
            return a = key(a), b = key(b), intReverse * ((a > b) - (b > a));
        }
    }

    var _createEdit = function () {
        _txtNome = window.document.getElementById("txtNome");
        _txtNome.onchange = _txtNomeValidade;
        _txtNome.onkeyup = _txtNomeValidade;
        _txtNome.setAttribute("maxlength", "15");

        _txtCidade = window.document.getElementById("txtCidade");
        _txtCidade.onchange = _txtCidadeValidade;
        _txtCidade.onkeyup = _txtCidadeValidade;

        _datepicker = window.document.getElementById("txtDatePicker");
        _datepicker.onchange = _datepickerValidade;
         $(function () {
            $(_datepicker).datepicker();
         });

         _ddlTipo = window.document.getElementById("ddlTipo");
         _ddlTipo.onchange = _ddlTipoValidade;

         _resetValidation.call(this);
    }

    var _ddlTipoValidade = function () {
        var regEx = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/;
        if (_ddlTipo.selectedIndex == 0) {
            return _toggleValidade.call(this, _ddlTipo, false, "Selecione um Tipo!!!");
        } else {
            return _toggleValidade.call(this, _ddlTipo, true, "");
        }
    }

    var _resetValidation = function () {

        _toggleValidade.call(this, _txtNome, true, "");
        _toggleValidade.call(this, _txtCidade, true, "");
        _toggleValidade.call(this, _datepicker, true, "");
        _toggleValidade.call(this, _ddlTipo, true, "");
   
        $("#divAlertSave").hide();
        _formValid = 0;
    }

   

    var _txtNomeValidade = function () {

        //if (_txtNome.value.length < 3) {
        //    return _toggleValidade.call(this, _txtNome, false, "minimo 3 cararcteres!!!");
        //}

        //var regEx = /^999$/;
        //if (regEx.test(_txtNome.value)) {
        //    return _toggleValidade.call(this,_txtNome,true,"");
        //} else {
        //    return _toggleValidade.call(this, _txtNome, false, "Erro no Nome!!!");
        //}

       // var regEx = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

        //_txtNome.value = _txtNome.value.replace(/\D[^\(][^\)]/g, '');


        var txtbase = _txtNome.value.replace(/\D/g, '');
        switch (txtbase.length) {
            case 0:
                _txtNome.value = "";
                break;
            case 1:
                _txtNome.value = "(" + txtbase;
                break;
            case 2:
                _txtNome.value = "("+ txtbase + ") ";
                break;
            case 7:
                _txtNome.value = "("+ txtbase.substring(0, 2) +") " + txtbase.substring(2, 7)+"-";
                break;
            default:
                _txtNome.value = _txtNome.value;
        }

        var regEx = /^\(\d{2}\)\s\d{5}-\d{4}$/;
       
        if (regEx.test(_txtNome.value)) {
            return _toggleValidade.call(this,_txtNome,true,"");
        } else {
            return _toggleValidade.call(this, _txtNome, false, "Erro no Nome!!!");
        }

    }

    var _txtCidadeValidade = function () {
        var regEx = /^99$/;
        if (regEx.test(_txtCidade.value)) {
            return _toggleValidade.call(this, _txtCidade, true, "");
        } else {
            return _toggleValidade.call(this, _txtCidade, false, "Erro na Cidade!!!");
        }
    }

    var _datepickerValidade = function () {
        var regEx = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/;
        if (regEx.test(_datepicker.value)) {
            return _toggleValidade.call(this, _datepicker, true, "");
        } else {
            return _toggleValidade.call(this, _datepicker, false, "Data Invalida!!!");
        }
    }

    var _toggleValidade = function (input,valid,message) {
        var _div = $(input).parent();
        if (valid) {
            $(_div).removeClass("form-group has-error has-feedback");
            $(_div).find("span").hide();
            return 0;
        } else {
            $(_div).addClass("form-group has-error has-feedback");
            $(_div).find("span").show();
            $(_div).find("span")[1].innerHTML = message;
            return 1;
        }
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtNomeValidade.call(this);
        _formValid += _txtCidadeValidade.call(this);
        _formValid += _datepickerValidade.call(this);
        _formValid += _ddlTipoValidade.call(this);
        return (_formValid==0);
    }

 
    var _editAt = function (id) {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].id === id) {
                _txtNome.value = _datasource[i].nome;
                _txtCidade.value = _datasource[i].cidade;
                _idEdit = id;
            }
        }
        $("#EditModal").modal('show');
        _resetValidation.call(this);
    }

    var _newItem = function () {
        _idEdit = 0;
        _txtNome.value = "";
        _txtCidade.value = "";
        $("#EditModal").modal('show');
        _resetValidation.call(this);
    }

    var _save = function () {
        if (_validate.call(this)) {
            if (_idEdit !== 0) {
                for (var i = 0; i < _datasource.length; i++) {
                    if (_datasource[i].id === _idEdit) {
                        _datasource[i].nome = _txtNome.value;
                        _datasource[i].cidade = _txtCidade.value;
                        _datasource[i].situacao = 'alterado';
                    }
                }
            } else {
                _id = _datasource.length + 1;
                var _item = {
                              id: _id,
                              nome: _txtNome.value,
                              cidade: _txtCidade.value,
                              situacao: "Novo"
                            };
                _datasource.push(_item);
            }

            _txtNome.value = "";
            _txtCidade.value = "";
            _idEdit = 0;
           
            _tableDataBind.call(this);
            $("#EditModal").modal('hide');
        } else {
            $("#divAlertSave").show();
        }
    }

    var _tableDataBind = function () {
        _limpar.call(this);
        var linha = 0;
        for (var i = 0; i < _datasource.length; i++) {
            linha++;
            var row = _table.insertRow(linha);
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            var cell5 = row.insertCell(5);
            var cell6 = row.insertCell(6);

            cell0.innerHTML = _datasource[i].id;
            cell1.innerHTML = _datasource[i].nome;
            cell2.innerHTML = _datasource[i].situacao;
        
            if (_datasource[i].situacao === "editar") {
                var _input = window.document.createElement("input");
                _input.type = "text"
                _input.id = "txtCidade" + i;
                _input.value = _datasource[i].cidade;
                cell3.appendChild(_input);

                var _btnEditar = window.document.createElement("button");
                _btnEditar.setAttribute("type", "button");
                _btnEditar.setAttribute("class", "btn btn-primary");
                _btnEditar.setAttribute("onclick", "javascript:mGrid.gridSaveAt(" + i + ");")
                _btnEditar.innerHTML = "Salvar";
                cell6.appendChild(_btnEditar);

            } else {
                cell3.innerHTML = _datasource[i].cidade;

                var _btnEditar = window.document.createElement("button");
                _btnEditar.setAttribute("type", "button");
                _btnEditar.setAttribute("class", "btn btn-default");
                _btnEditar.setAttribute("onclick", "javascript:mGrid.changeEditAt(" + _datasource[i].id + ");")
                _btnEditar.innerHTML = "Editar";
                cell6.appendChild(_btnEditar);
            }
            
            cell4.innerHTML = "<div><a href='#' onClick='mGrid.editAt(" + _datasource[i].id + ");return false;'>Editar</a></div>";
            cell5.innerHTML = "<div><a href='#' onClick='mGrid.confirm(" + _datasource[i].id + ");return false;'>Exluir</a></div>";

        }
    }

    var _createConfirm = function () {

        _divConfirm = window.document.createElement("div");
        _divConfirm.setAttribute("id", "mConfirm");
        _divConfirm.setAttribute("class", "modal fade");
        _divConfirm.setAttribute("role", "dialog");

        var _divModalDialog = window.document.createElement("div");
        _divModalDialog.setAttribute("class", "modal-dialog modal-sm");

        var _divContent = window.document.createElement("div");
        _divContent.setAttribute("class", "modal-content");

        var _divHeader = window.document.createElement("div");
        _divHeader.setAttribute("class", "modal-header");

        var _btnX = window.document.createElement("button");
        _btnX.setAttribute("type", "button");
        _btnX.setAttribute("class", "close");
        _btnX.setAttribute("data-dismiss", "modal");
        _btnX.innerHTML = "&times;";

        var _h4 = window.document.createElement("h4");
        _h4.setAttribute("class", "modal-title");
        _h4.innerHTML = "Confirmar";

        var _divFooter = window.document.createElement("div");
        _divFooter.setAttribute("class", "modal-footer");

        var _btnClose = window.document.createElement("button");
        _btnClose.setAttribute("type", "button");
        _btnClose.setAttribute("class", "btn btn-default");
        _btnClose.setAttribute("data-dismiss", "modal");
        _btnClose.innerHTML = "Close";

        var _btnConfirm = window.document.createElement("button");
        _btnConfirm.setAttribute("type", "button");
        _btnConfirm.setAttribute("class", "btn btn-primary");
        _btnConfirm.setAttribute("onclick", "javascript:mGrid.removeAt();")
        _btnConfirm.innerHTML = "OK";

        _divFooter.appendChild(_btnClose);
        _divFooter.appendChild(_btnConfirm);
        _divHeader.appendChild(_btnX);
        _divHeader.appendChild(_h4);
        _divContent.appendChild(_divHeader);


        var _divEdit = window.document.createElement("div");
        _divEdit.id = 'divEdit';
        _divEdit.setAttribute("class", "modal-body");
        _divContent.appendChild(_divEdit);

        _lblMensagem = window.document.createElement("label");
        _lblMensagem.innerHTML = "Mensagem";
        _divEdit.appendChild(_lblMensagem);

        _divContent.appendChild(_divFooter);
        _divModalDialog.appendChild(_divContent);
        _divConfirm.appendChild(_divModalDialog);

        _mainDiv.appendChild(_divConfirm);
    }


    var _eventoTestar = function (id) {
        var input = window.document.getElementById("txtCidade" + id);
        input.style.color = "blue";
        alert(input.value);
    }

    var _gridSaveAt = function (i) {
        var input = window.document.getElementById("txtCidade" + i);
        _datasource[i].cidade = input.value;
        _datasource[i].situacao = 'alterado';
        _tableDataBind.call(this);
    }

    var _confirm = function (id) {
        _idExcluir = id;
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].id === id) {
                _lblMensagem.innerHTML = _datasource[i].nome;
            }
        }
        $("#mConfirm").modal('show');
        _resetValidation.call(this);
    }

    var _removeAt = function () {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].id === _idExcluir) {
                _datasource.splice(i, 1);
            }
        }
        _idExcluir = 0;
        _tableDataBind.call(this);
        $("#mConfirm").modal('hide');
        _resetValidation.call(this);
    }

    var _changeEditAt = function (id) {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].id === id) {
                _datasource[i].situacao = 'editar';
            }
        }
        _tableDataBind.call(this);
    }

    var _limpar = function () {
        var tableHeaderRowCount = 1;
        var rowCount = _table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            _table.deleteRow(tableHeaderRowCount);
        }
    }


    var _list = function () {
        return _datasource;
    }

    return {
        gridSaveAt:_gridSaveAt,
        validate: _validate,
        newItem: _newItem,
        save: _save,
        changeEditAt: _changeEditAt,
        editAt: _editAt,
        confirm: _confirm,
        removeAt: _removeAt,
        limpar: _limpar,
        create: _create,
        list: _list,
        eventoTestar: _eventoTestar,
        sort: _sort
    }
})();
