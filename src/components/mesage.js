const mesageCard = (image, name, mesage) => {
  {
    {
      !(
        <div class="flex justify-start items-start flex-col gap-2 bg-slate-100 w-96 text-slate-900 p-6 rounded-xl">
          <div class="flex justify-start items-center gap-4">
            <img src={image} alt="" class="w-10 h-10 rounded-full" />
            <h3 class="text-xl text-medium">{name}</h3>
          </div>
          <p>{mesage}</p>
          <p class="text-slate-400">02/02/2023 21:26</p>
        </div>
      );
    }
  }
};

export default mesageCard;
