from pymongo import MongoClient

client = MongoClient()
db = client["Edusoft"]
Prueba = db["Login"]
Atributos = {"Usuario": "", "Correo": "", "Password": ""}
iterar = list(Atributos.keys())


def insertar(inserts):
    for i in range(len(inserts)):
        if inserts[i].isnumeric():
            Atributos[iterar[i]] = int(inserts[i])
        else:
            Atributos[iterar[i]] = inserts[i]
    Prueba.insert_one(Atributos)


def buscar(parametros):
    par = {}
    for i in range(len(parametros)):
        if len(parametros[i]) == 0:
            continue
        else:
            par[iterar[i]] = parametros[i]
    s = Prueba.find_one(par)
    if s is None:
        print("No se pudo encontrar el contacto, revisalo \n")
    else:
        print("Datos coinciden, Iniciando sesion!")
        for i in range(3):
            if s[iterar[i]] == "":
                print("{x}: No asignado".format(x=iterar[i], y=s[iterar[i]]))
            else:
                print("{x}: {y}".format(x=iterar[i], y=s[iterar[i]]))
    print("\n")


def ver_contactos():
    s = Prueba.find()
    p = Prueba.find_one()
    if p is None:
        print("No hay contactos, revisalo \n")
    else:
        print("Encontrado! \n")
        for cont, v in enumerate(s):
            if cont >= 1:
                print("\n Otro contacto encontrado! \n")
            for i in range(3):
                if v[iterar[i]] == "":
                    print("{x}: No asignado".format(x=iterar[i], y=v[iterar[i]]))
                else:
                    print("{x}: {y}".format(x=iterar[i], y=v[iterar[i]]))
        print("\n")


def main():
    while True:
        opi = int(input("Que desea hacer?\n 1.Añadir usuario\n 2.Iniciar sesion "
                        "\n 3.Ver usuarios \n 4.Cerrar \n"))
        if opi == 1:
            inp = (input("Ingrese los datos del contacto en el siguiente orden y formato: \n"
                         "Usuario, Correo, Password\n"))
            insert = inp.split(", ")
            insertar(insert)
        elif opi == 2:
            parametros = []
            for i in range(3):
                p = (input("Ingrese el {x} del contacto \n".format(x=iterar[i])))
                if p.isnumeric():
                    p = int(p)
                parametros.append(p)
            buscar(parametros)
        elif opi == 3:
            ver_contactos()
        elif opi == 4:
            break
    client.close()


if __name__ == "__main__":
    main()

#Julian Giraldo Perez, Danilo de Jesus Toro, David Madrid Restrepo y Juan David Prieto Martinez